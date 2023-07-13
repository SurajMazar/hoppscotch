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
exports.UserSettingsUserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_model_1 = require("../user/user.model");
const user_settings_model_1 = require("./user-settings.model");
const user_settings_service_1 = require("./user-settings.service");
const E = require("fp-ts/Either");
const utils_1 = require("../utils");
let UserSettingsUserResolver = class UserSettingsUserResolver {
    constructor(userSettingsService) {
        this.userSettingsService = userSettingsService;
    }
    async settings(user) {
        const userSettings = await this.userSettingsService.fetchUserSettings(user);
        if (E.isLeft(userSettings))
            (0, utils_1.throwErr)(userSettings.left);
        return userSettings.right;
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => user_settings_model_1.UserSettings, {
        description: 'Returns user settings',
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", Promise)
], UserSettingsUserResolver.prototype, "settings", null);
UserSettingsUserResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_model_1.User),
    __metadata("design:paramtypes", [user_settings_service_1.UserSettingsService])
], UserSettingsUserResolver);
exports.UserSettingsUserResolver = UserSettingsUserResolver;
//# sourceMappingURL=user.resolver.js.map