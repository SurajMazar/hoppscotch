"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mailer_service_1 = require("../mailer/mailer.service");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
const luxon_1 = require("luxon");
const argon2 = require("argon2");
const bcrypt = require("bcrypt");
const O = require("fp-ts/Option");
const E = require("fp-ts/Either");
const errors_1 = require("../errors");
const utils_1 = require("../utils");
const jwt_1 = require("@nestjs/jwt");
const helper_1 = require("./helper");
let AuthService = class AuthService {
    constructor(usersService, prismaService, jwtService, mailerService) {
        this.usersService = usersService;
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async generateMagicLinkTokens(user) {
        const salt = await bcrypt.genSalt(parseInt(process.env.TOKEN_SALT_COMPLEXITY));
        const expiresOn = luxon_1.DateTime.now()
            .plus({ hours: parseInt(process.env.MAGIC_LINK_TOKEN_VALIDITY) })
            .toISO()
            .toString();
        const idToken = await this.prismaService.verificationToken.create({
            data: {
                deviceIdentifier: salt,
                userUid: user.uid,
                expiresOn: expiresOn,
            },
        });
        return idToken;
    }
    async validatePasswordlessTokens(magicLinkTokens) {
        try {
            const tokens = await this.prismaService.verificationToken.findUniqueOrThrow({
                where: {
                    passwordless_deviceIdentifier_tokens: {
                        deviceIdentifier: magicLinkTokens.deviceIdentifier,
                        token: magicLinkTokens.token,
                    },
                },
            });
            return O.some(tokens);
        }
        catch (error) {
            return O.none;
        }
    }
    async generateRefreshToken(userUid) {
        const refreshTokenPayload = {
            iss: process.env.VITE_BASE_URL,
            sub: userUid,
            aud: [process.env.VITE_BASE_URL],
        };
        const refreshToken = await this.jwtService.sign(refreshTokenPayload, {
            expiresIn: process.env.REFRESH_TOKEN_VALIDITY,
        });
        const refreshTokenHash = await argon2.hash(refreshToken);
        const updatedUser = await this.usersService.UpdateUserRefreshToken(refreshTokenHash, userUid);
        if (E.isLeft(updatedUser))
            return E.left({
                message: updatedUser.left,
                statusCode: common_1.HttpStatus.NOT_FOUND,
            });
        return E.right(refreshToken);
    }
    async generateAuthTokens(userUid) {
        const accessTokenPayload = {
            iss: process.env.VITE_BASE_URL,
            sub: userUid,
            aud: [process.env.VITE_BASE_URL],
        };
        const refreshToken = await this.generateRefreshToken(userUid);
        if (E.isLeft(refreshToken))
            return E.left(refreshToken.left);
        return E.right({
            access_token: await this.jwtService.sign(accessTokenPayload, {
                expiresIn: process.env.ACCESS_TOKEN_VALIDITY,
            }),
            refresh_token: refreshToken.right,
        });
    }
    async deleteMagicLinkVerificationTokens(passwordlessTokens) {
        try {
            const deletedPasswordlessToken = await this.prismaService.verificationToken.delete({
                where: {
                    passwordless_deviceIdentifier_tokens: {
                        deviceIdentifier: passwordlessTokens.deviceIdentifier,
                        token: passwordlessTokens.token,
                    },
                },
            });
            return E.right(deletedPasswordlessToken);
        }
        catch (error) {
            return E.left(errors_1.VERIFICATION_TOKEN_DATA_NOT_FOUND);
        }
    }
    async checkIfProviderAccountExists(user, SSOUserData) {
        const provider = await this.prismaService.account.findUnique({
            where: {
                verifyProviderAccount: {
                    provider: SSOUserData.provider,
                    providerAccountId: SSOUserData.id,
                },
            },
        });
        if (!provider)
            return O.none;
        return O.some(provider);
    }
    async signInMagicLink(email, origin) {
        if (!(0, utils_1.validateEmail)(email))
            return E.left({
                message: errors_1.INVALID_EMAIL,
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            });
        let user;
        const queriedUser = await this.usersService.findUserByEmail(email);
        if (O.isNone(queriedUser)) {
            user = await this.usersService.createUserViaMagicLink(email);
        }
        else {
            user = queriedUser.value;
        }
        const generatedTokens = await this.generateMagicLinkTokens(user);
        let url;
        switch (origin) {
            case helper_1.Origin.ADMIN:
                url = process.env.VITE_ADMIN_URL;
                break;
            case helper_1.Origin.APP:
                url = process.env.VITE_BASE_URL;
                break;
            default:
                url = process.env.VITE_BASE_URL;
        }
        await this.mailerService.sendAuthEmail(email, {
            template: 'code-your-own',
            variables: {
                inviteeEmail: email,
                magicLink: `${url}/enter?token=${generatedTokens.token}`,
            },
        });
        return E.right({
            deviceIdentifier: generatedTokens.deviceIdentifier,
        });
    }
    async verifyMagicLinkTokens(magicLinkIDTokens) {
        const passwordlessTokens = await this.validatePasswordlessTokens(magicLinkIDTokens);
        if (O.isNone(passwordlessTokens))
            return E.left({
                message: errors_1.INVALID_MAGIC_LINK_DATA,
                statusCode: common_1.HttpStatus.NOT_FOUND,
            });
        const user = await this.usersService.findUserById(passwordlessTokens.value.userUid);
        if (O.isNone(user))
            return E.left({
                message: errors_1.USER_NOT_FOUND,
                statusCode: common_1.HttpStatus.NOT_FOUND,
            });
        const profile = {
            provider: 'magic',
            id: user.value.email,
        };
        const providerAccountExists = await this.checkIfProviderAccountExists(user.value, profile);
        if (O.isNone(providerAccountExists)) {
            await this.usersService.createProviderAccount(user.value, null, null, profile);
        }
        const currentTime = luxon_1.DateTime.now().toISO();
        if (currentTime > passwordlessTokens.value.expiresOn.toISOString())
            return E.left({
                message: errors_1.MAGIC_LINK_EXPIRED,
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
            });
        const tokens = await this.generateAuthTokens(passwordlessTokens.value.userUid);
        if (E.isLeft(tokens))
            return E.left({
                message: tokens.left.message,
                statusCode: tokens.left.statusCode,
            });
        const deletedPasswordlessToken = await this.deleteMagicLinkVerificationTokens(passwordlessTokens.value);
        if (E.isLeft(deletedPasswordlessToken))
            return E.left({
                message: deletedPasswordlessToken.left,
                statusCode: common_1.HttpStatus.NOT_FOUND,
            });
        return E.right(tokens.right);
    }
    async refreshAuthTokens(hashedRefreshToken, user) {
        if (!user)
            return E.left({
                message: errors_1.USER_NOT_FOUND,
                statusCode: common_1.HttpStatus.NOT_FOUND,
            });
        const isTokenMatched = await argon2.verify(user.refreshToken, hashedRefreshToken);
        if (!isTokenMatched)
            return E.left({
                message: errors_1.INVALID_REFRESH_TOKEN,
                statusCode: common_1.HttpStatus.NOT_FOUND,
            });
        const generatedAuthTokens = await this.generateAuthTokens(user.uid);
        if (E.isLeft(generatedAuthTokens))
            return E.left({
                message: generatedAuthTokens.left.message,
                statusCode: generatedAuthTokens.left.statusCode,
            });
        return E.right(generatedAuthTokens.right);
    }
    async verifyAdmin(user) {
        if (user.isAdmin)
            return E.right({ isAdmin: true });
        const usersCount = await this.usersService.getUsersCount();
        if (usersCount === 1) {
            const elevatedUser = await this.usersService.makeAdmin(user.uid);
            if (E.isLeft(elevatedUser))
                return E.left({
                    message: elevatedUser.left,
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                });
            return E.right({ isAdmin: true });
        }
        return E.right({ isAdmin: false });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        prisma_service_1.PrismaService,
        jwt_1.JwtService,
        mailer_service_1.MailerService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map