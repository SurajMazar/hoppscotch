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
exports.UserEnvsUserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_model_1 = require("../user/user.model");
const user_environments_model_1 = require("./user-environments.model");
const user_environments_service_1 = require("./user-environments.service");
const E = require("fp-ts/Either");
const utils_1 = require("../utils");
let UserEnvsUserResolver = class UserEnvsUserResolver {
    constructor(userEnvironmentsService) {
        this.userEnvironmentsService = userEnvironmentsService;
    }
    async environments(user) {
        return await this.userEnvironmentsService.fetchUserEnvironments(user.uid);
    }
    async globalEnvironments(user) {
        const userEnvironment = await this.userEnvironmentsService.fetchUserGlobalEnvironment(user.uid);
        if (E.isLeft(userEnvironment))
            (0, utils_1.throwErr)(userEnvironment.left);
        return userEnvironment.right;
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => [user_environments_model_1.UserEnvironment], {
        description: 'Returns a list of users personal environments',
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", Promise)
], UserEnvsUserResolver.prototype, "environments", null);
__decorate([
    (0, graphql_1.ResolveField)(() => user_environments_model_1.UserEnvironment, {
        description: 'Returns the users global environments',
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", Promise)
], UserEnvsUserResolver.prototype, "globalEnvironments", null);
UserEnvsUserResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_model_1.User),
    __metadata("design:paramtypes", [user_environments_service_1.UserEnvironmentsService])
], UserEnvsUserResolver);
exports.UserEnvsUserResolver = UserEnvsUserResolver;
//# sourceMappingURL=user.resolver.js.map