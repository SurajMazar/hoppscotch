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
exports.ShortcodeService = void 0;
const common_1 = require("@nestjs/common");
const O = require("fp-ts/Option");
const TO = require("fp-ts/TaskOption");
const E = require("fp-ts/Either");
const prisma_service_1 = require("../prisma/prisma.service");
const errors_1 = require("../errors");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const user_service_1 = require("../user/user.service");
const utils_1 = require("../utils");
const SHORT_CODE_LENGTH = 12;
const SHORT_CODE_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
let ShortcodeService = class ShortcodeService {
    constructor(prisma, pubsub, userService) {
        this.prisma = prisma;
        this.pubsub = pubsub;
        this.userService = userService;
    }
    onModuleInit() {
        this.userService.registerUserDataHandler(this);
    }
    canAllowUserDeletion(user) {
        return TO.none;
    }
    onUserDelete(user) {
        return async () => {
            await this.deleteUserShortCodes(user.uid);
        };
    }
    returnShortCode(shortcodeInfo) {
        return {
            id: shortcodeInfo.id,
            request: JSON.stringify(shortcodeInfo.request),
            createdOn: shortcodeInfo.createdOn,
        };
    }
    generateShortCodeID() {
        let result = '';
        for (let i = 0; i < SHORT_CODE_LENGTH; i++) {
            result +=
                SHORT_CODE_CHARS[Math.floor(Math.random() * SHORT_CODE_CHARS.length)];
        }
        return result;
    }
    async generateUniqueShortCodeID() {
        while (true) {
            const code = this.generateShortCodeID();
            const data = await this.getShortCode(code);
            if (E.isLeft(data))
                return E.right(code);
        }
    }
    async getShortCode(shortcode) {
        try {
            const shortcodeInfo = await this.prisma.shortcode.findFirstOrThrow({
                where: { id: shortcode },
            });
            return E.right(this.returnShortCode(shortcodeInfo));
        }
        catch (error) {
            return E.left(errors_1.SHORTCODE_NOT_FOUND);
        }
    }
    async createShortcode(request, userUID) {
        const shortcodeData = (0, utils_1.stringToJson)(request);
        if (E.isLeft(shortcodeData))
            return E.left(errors_1.SHORTCODE_INVALID_JSON);
        const user = await this.userService.findUserById(userUID);
        const generatedShortCode = await this.generateUniqueShortCodeID();
        if (E.isLeft(generatedShortCode))
            return E.left(generatedShortCode.left);
        const createdShortCode = await this.prisma.shortcode.create({
            data: {
                id: generatedShortCode.right,
                request: shortcodeData.right,
                creatorUid: O.isNone(user) ? null : user.value.uid,
            },
        });
        if (createdShortCode.creatorUid) {
            this.pubsub.publish(`shortcode/${createdShortCode.creatorUid}/created`, this.returnShortCode(createdShortCode));
        }
        return E.right(this.returnShortCode(createdShortCode));
    }
    async fetchUserShortCodes(uid, args) {
        const shortCodes = await this.prisma.shortcode.findMany({
            where: {
                creatorUid: uid,
            },
            orderBy: {
                createdOn: 'desc',
            },
            skip: 1,
            take: args.take,
            cursor: args.cursor ? { id: args.cursor } : undefined,
        });
        const fetchedShortCodes = shortCodes.map((code) => this.returnShortCode(code));
        return fetchedShortCodes;
    }
    async revokeShortCode(shortcode, uid) {
        try {
            const deletedShortCodes = await this.prisma.shortcode.delete({
                where: {
                    creator_uid_shortcode_unique: {
                        creatorUid: uid,
                        id: shortcode,
                    },
                },
            });
            this.pubsub.publish(`shortcode/${deletedShortCodes.creatorUid}/revoked`, this.returnShortCode(deletedShortCodes));
            return E.right(true);
        }
        catch (error) {
            return E.left(errors_1.SHORTCODE_NOT_FOUND);
        }
    }
    async deleteUserShortCodes(uid) {
        const deletedShortCodes = await this.prisma.shortcode.deleteMany({
            where: {
                creatorUid: uid,
            },
        });
        return deletedShortCodes.count;
    }
};
ShortcodeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pubsub_service_1.PubSubService,
        user_service_1.UserService])
], ShortcodeService);
exports.ShortcodeService = ShortcodeService;
//# sourceMappingURL=shortcode.service.js.map