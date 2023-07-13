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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSettingsResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const gql_user_decorator_1 = require("../decorators/gql-user.decorator");
const gql_auth_guard_1 = require("../guards/gql-auth.guard");
const user_model_1 = require("../user/user.model");
const E = require("fp-ts/Either");
const utils_1 = require("../utils");
const user_settings_model_1 = require("./user-settings.model");
const user_settings_service_1 = require("./user-settings.service");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const gql_throttler_guard_1 = require("../guards/gql-throttler.guard");
const throttler_1 = require("@nestjs/throttler");
let UserSettingsResolver = class UserSettingsResolver {
    constructor(userSettingsService, pubsub) {
        this.userSettingsService = userSettingsService;
        this.pubsub = pubsub;
    }
    async createUserSettings(user, properties) {
        const createdUserSettings = await this.userSettingsService.createUserSettings(user, properties);
        if (E.isLeft(createdUserSettings))
            (0, utils_1.throwErr)(createdUserSettings.left);
        return createdUserSettings.right;
    }
    async updateUserSettings(user, properties) {
        const updatedUserSettings = await this.userSettingsService.updateUserSettings(user, properties);
        if (E.isLeft(updatedUserSettings))
            (0, utils_1.throwErr)(updatedUserSettings.left);
        return updatedUserSettings.right;
    }
    userSettingsCreated(user) {
        return this.pubsub.asyncIterator(`user_settings/${user.uid}/created`);
    }
    userSettingsUpdated(user) {
        return this.pubsub.asyncIterator(`user_settings/${user.uid}/updated`);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => user_settings_model_1.UserSettings, {
        description: 'Creates a new user setting',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'properties',
        description: 'Stringified JSON settings object',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserSettingsResolver.prototype, "createUserSettings", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_settings_model_1.UserSettings, {
        description: 'Update user setting for a given user',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'properties',
        description: 'Stringified JSON settings object',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserSettingsResolver.prototype, "updateUserSettings", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_settings_model_1.UserSettings, {
        description: 'Listen for user setting creation',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", void 0)
], UserSettingsResolver.prototype, "userSettingsCreated", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_settings_model_1.UserSettings, {
        description: 'Listen for user setting updates',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", void 0)
], UserSettingsResolver.prototype, "userSettingsUpdated", null);
UserSettingsResolver = __decorate([
    (0, common_1.UseGuards)(gql_throttler_guard_1.GqlThrottlerGuard),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [user_settings_service_1.UserSettingsService,
        pubsub_service_1.PubSubService])
], UserSettingsResolver);
exports.UserSettingsResolver = UserSettingsResolver;
//# sourceMappingURL=user-settings.resolver.js.map