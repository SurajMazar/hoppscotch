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
exports.UserSettingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const E = require("fp-ts/Either");
const utils_1 = require("../utils");
const errors_1 = require("../errors");
let UserSettingsService = class UserSettingsService {
    constructor(prisma, pubsub) {
        this.prisma = prisma;
        this.pubsub = pubsub;
    }
    castToUserSettings(userSettings) {
        return Object.assign(Object.assign({}, userSettings), { properties: JSON.stringify(userSettings.properties) });
    }
    async fetchUserSettings(user) {
        try {
            const userSettings = await this.prisma.userSettings.findUniqueOrThrow({
                where: { userUid: user.uid },
            });
            const settings = this.castToUserSettings(userSettings);
            return E.right(settings);
        }
        catch (e) {
            return E.left(errors_1.USER_SETTINGS_NOT_FOUND);
        }
    }
    async createUserSettings(user, properties) {
        if (!properties)
            return E.left(errors_1.USER_SETTINGS_NULL_SETTINGS);
        const jsonProperties = (0, utils_1.stringToJson)(properties);
        if (E.isLeft(jsonProperties))
            return E.left(jsonProperties.left);
        try {
            const userSettings = await this.prisma.userSettings.create({
                data: {
                    properties: jsonProperties.right,
                    userUid: user.uid,
                },
            });
            const settings = this.castToUserSettings(userSettings);
            await this.pubsub.publish(`user_settings/${user.uid}/created`, settings);
            return E.right(settings);
        }
        catch (e) {
            return E.left(errors_1.USER_SETTINGS_ALREADY_EXISTS);
        }
    }
    async updateUserSettings(user, properties) {
        if (!properties)
            return E.left(errors_1.USER_SETTINGS_NULL_SETTINGS);
        const jsonProperties = (0, utils_1.stringToJson)(properties);
        if (E.isLeft(jsonProperties))
            return E.left(jsonProperties.left);
        try {
            const updatedUserSettings = await this.prisma.userSettings.update({
                where: { userUid: user.uid },
                data: {
                    properties: jsonProperties.right,
                },
            });
            const settings = this.castToUserSettings(updatedUserSettings);
            await this.pubsub.publish(`user_settings/${user.uid}/updated`, settings);
            return E.right(settings);
        }
        catch (e) {
            return E.left(errors_1.USER_SETTINGS_NOT_FOUND);
        }
    }
};
UserSettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pubsub_service_1.PubSubService])
], UserSettingsService);
exports.UserSettingsService = UserSettingsService;
//# sourceMappingURL=user-settings.service.js.map