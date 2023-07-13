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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const O = require("fp-ts/Option");
const E = require("fp-ts/Either");
const TO = require("fp-ts/TaskOption");
const TE = require("fp-ts/TaskEither");
const T = require("fp-ts/Task");
const A = require("fp-ts/Array");
const function_1 = require("fp-ts/function");
const errors_1 = require("../errors");
const user_model_1 = require("./user.model");
const errors_2 = require("../errors");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const utils_1 = require("../utils");
let UserService = class UserService {
    constructor(prisma, pubsub) {
        this.prisma = prisma;
        this.pubsub = pubsub;
        this.userDataHandlers = [];
    }
    registerUserDataHandler(handler) {
        this.userDataHandlers.push(handler);
    }
    convertDbUserToUser(dbUser) {
        const dbCurrentRESTSession = dbUser.currentRESTSession;
        const dbCurrentGQLSession = dbUser.currentGQLSession;
        return Object.assign(Object.assign({}, dbUser), { currentRESTSession: dbCurrentRESTSession
                ? JSON.stringify(dbCurrentRESTSession)
                : null, currentGQLSession: dbCurrentGQLSession
                ? JSON.stringify(dbCurrentGQLSession)
                : null });
    }
    async findUserByEmail(email) {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    email: email,
                },
            });
            return O.some(user);
        }
        catch (error) {
            return O.none;
        }
    }
    async findUserById(userUid) {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    uid: userUid,
                },
            });
            return O.some(user);
        }
        catch (error) {
            return O.none;
        }
    }
    async UpdateUserRefreshToken(refreshTokenHash, userUid) {
        try {
            const user = await this.prisma.user.update({
                where: {
                    uid: userUid,
                },
                data: {
                    refreshToken: refreshTokenHash,
                },
            });
            return E.right(user);
        }
        catch (error) {
            return E.left(errors_1.USER_NOT_FOUND);
        }
    }
    async createUserViaMagicLink(email) {
        const createdUser = await this.prisma.user.create({
            data: {
                email: email,
                providerAccounts: {
                    create: {
                        provider: 'magic',
                        providerAccountId: email,
                    },
                },
            },
        });
        return createdUser;
    }
    async createUserSSO(accessTokenSSO, refreshTokenSSO, profile) {
        const userDisplayName = !profile.displayName ? null : profile.displayName;
        const userPhotoURL = !profile.photos ? null : profile.photos[0].value;
        const createdUser = await this.prisma.user.create({
            data: {
                displayName: userDisplayName,
                email: profile.emails[0].value,
                photoURL: userPhotoURL,
                providerAccounts: {
                    create: {
                        provider: profile.provider,
                        providerAccountId: profile.id,
                        providerRefreshToken: refreshTokenSSO,
                        providerAccessToken: accessTokenSSO,
                    },
                },
            },
        });
        return createdUser;
    }
    async createProviderAccount(user, accessToken, refreshToken, profile) {
        const createdProvider = await this.prisma.account.create({
            data: {
                provider: profile.provider,
                providerAccountId: profile.id,
                providerRefreshToken: refreshToken ? refreshToken : null,
                providerAccessToken: accessToken ? accessToken : null,
                user: {
                    connect: {
                        uid: user.uid,
                    },
                },
            },
        });
        return createdProvider;
    }
    async updateUserDetails(user, profile) {
        try {
            const updatedUser = await this.prisma.user.update({
                where: {
                    uid: user.uid,
                },
                data: {
                    displayName: !profile.displayName ? null : profile.displayName,
                    photoURL: !profile.photos ? null : profile.photos[0].value,
                },
            });
            return E.right(updatedUser);
        }
        catch (error) {
            return E.left(errors_1.USER_NOT_FOUND);
        }
    }
    async updateUserSessions(user, currentSession, sessionType) {
        const validatedSession = await this.validateSession(currentSession);
        if (E.isLeft(validatedSession))
            return E.left(validatedSession.left);
        try {
            const sessionObj = {};
            switch (sessionType) {
                case user_model_1.SessionType.GQL:
                    sessionObj['currentGQLSession'] = validatedSession.right;
                    break;
                case user_model_1.SessionType.REST:
                    sessionObj['currentRESTSession'] = validatedSession.right;
                    break;
                default:
                    return E.left(errors_2.USER_UPDATE_FAILED);
            }
            const dbUpdatedUser = await this.prisma.user.update({
                where: { uid: user.uid },
                data: sessionObj,
            });
            const updatedUser = this.convertDbUserToUser(dbUpdatedUser);
            await this.pubsub.publish(`user/${updatedUser.uid}/updated`, updatedUser);
            return E.right(updatedUser);
        }
        catch (e) {
            return E.left(errors_2.USER_UPDATE_FAILED);
        }
    }
    async validateSession(sessionData) {
        const jsonSession = (0, utils_1.stringToJson)(sessionData);
        if (E.isLeft(jsonSession))
            return E.left(jsonSession.left);
        return E.right(jsonSession.right);
    }
    async fetchAllUsers(cursorID, take) {
        const fetchedUsers = await this.prisma.user.findMany({
            skip: cursorID ? 1 : 0,
            take: take,
            cursor: cursorID ? { uid: cursorID } : undefined,
        });
        return fetchedUsers;
    }
    async getUsersCount() {
        const usersCount = await this.prisma.user.count();
        return usersCount;
    }
    async makeAdmin(userUID) {
        try {
            const elevatedUser = await this.prisma.user.update({
                where: {
                    uid: userUID,
                },
                data: {
                    isAdmin: true,
                },
            });
            return E.right(elevatedUser);
        }
        catch (error) {
            return E.left(errors_1.USER_NOT_FOUND);
        }
    }
    async fetchAdminUsers() {
        const admins = this.prisma.user.findMany({
            where: {
                isAdmin: true,
            },
        });
        return admins;
    }
    async deleteUserAccount(uid) {
        try {
            await this.prisma.user.delete({
                where: {
                    uid: uid,
                },
            });
            return E.right(true);
        }
        catch (e) {
            return E.left(errors_1.USER_NOT_FOUND);
        }
    }
    getUserDeletionErrors(user) {
        return (0, function_1.pipe)(this.userDataHandlers, A.map((handler) => (0, function_1.pipe)(handler.canAllowUserDeletion(user), TO.matchE(() => TE.right(undefined), (error) => TE.left(error)))), utils_1.taskEitherValidateArraySeq, TE.matchE((e) => TO.some(e), () => TO.none));
    }
    deleteUserByUID(user) {
        return (0, function_1.pipe)(this.getUserDeletionErrors(user), TO.matchEW(() => (0, function_1.pipe)(this.userDataHandlers, A.map((handler) => handler.onUserDelete(user)), T.sequenceArray, T.map(function_1.constVoid), TE.fromTask), (errors) => TE.left(errors)), TE.chainW(() => () => this.deleteUserAccount(user.uid)), TE.chainFirst(() => TE.fromTask(() => this.pubsub.publish(`user/${user.uid}/deleted`, {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            isAdmin: user.isAdmin,
            createdOn: user.createdOn,
            currentGQLSession: user.currentGQLSession,
            currentRESTSession: user.currentRESTSession,
        }))), TE.mapLeft((errors) => errors.toString()));
    }
    async removeUserAsAdmin(userUID) {
        try {
            const user = await this.prisma.user.update({
                where: {
                    uid: userUID,
                },
                data: {
                    isAdmin: false,
                },
            });
            return E.right(user);
        }
        catch (error) {
            return E.left(errors_1.USER_NOT_FOUND);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pubsub_service_1.PubSubService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map