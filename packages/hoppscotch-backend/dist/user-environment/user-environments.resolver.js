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
exports.UserEnvironmentsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const user_environments_model_1 = require("./user-environments.model");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../guards/gql-auth.guard");
const gql_user_decorator_1 = require("../decorators/gql-user.decorator");
const user_model_1 = require("../user/user.model");
const user_environments_service_1 = require("./user-environments.service");
const E = require("fp-ts/Either");
const utils_1 = require("../utils");
const gql_throttler_guard_1 = require("../guards/gql-throttler.guard");
const throttler_1 = require("@nestjs/throttler");
let UserEnvironmentsResolver = class UserEnvironmentsResolver {
    constructor(userEnvironmentsService, pubsub) {
        this.userEnvironmentsService = userEnvironmentsService;
        this.pubsub = pubsub;
    }
    async createUserEnvironment(user, name, variables) {
        const isGlobal = false;
        const userEnvironment = await this.userEnvironmentsService.createUserEnvironment(user.uid, name, variables, isGlobal);
        if (E.isLeft(userEnvironment))
            (0, utils_1.throwErr)(userEnvironment.left);
        return userEnvironment.right;
    }
    async createUserGlobalEnvironment(user, variables) {
        const isGlobal = true;
        const userEnvironment = await this.userEnvironmentsService.createUserEnvironment(user.uid, null, variables, isGlobal);
        if (E.isLeft(userEnvironment))
            (0, utils_1.throwErr)(userEnvironment.left);
        return userEnvironment.right;
    }
    async updateUserEnvironment(id, name, variables) {
        const userEnvironment = await this.userEnvironmentsService.updateUserEnvironment(id, name, variables);
        if (E.isLeft(userEnvironment))
            (0, utils_1.throwErr)(userEnvironment.left);
        return userEnvironment.right;
    }
    async deleteUserEnvironment(user, id) {
        const userEnvironment = await this.userEnvironmentsService.deleteUserEnvironment(user.uid, id);
        if (E.isLeft(userEnvironment))
            (0, utils_1.throwErr)(userEnvironment.left);
        return userEnvironment.right;
    }
    async deleteUserEnvironments(user) {
        return await this.userEnvironmentsService.deleteUserEnvironments(user.uid);
    }
    async clearGlobalEnvironments(user, id) {
        const userEnvironment = await this.userEnvironmentsService.clearGlobalEnvironments(user.uid, id);
        if (E.isLeft(userEnvironment))
            (0, utils_1.throwErr)(userEnvironment.left);
        return userEnvironment.right;
    }
    userEnvironmentCreated(user) {
        return this.pubsub.asyncIterator(`user_environment/${user.uid}/created`);
    }
    userEnvironmentUpdated(user) {
        return this.pubsub.asyncIterator(`user_environment/${user.uid}/updated`);
    }
    userEnvironmentDeleted(user) {
        return this.pubsub.asyncIterator(`user_environment/${user.uid}/deleted`);
    }
    userEnvironmentDeleteMany(user) {
        return this.pubsub.asyncIterator(`user_environment/${user.uid}/deleted_many`);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => user_environments_model_1.UserEnvironment, {
        description: 'Create a new personal user environment for given user uid',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'name',
        description: 'Name of the User Environment, if global send an empty string',
    })),
    __param(2, (0, graphql_1.Args)({
        name: 'variables',
        description: 'JSON string of the variables object',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, String, String]),
    __metadata("design:returntype", Promise)
], UserEnvironmentsResolver.prototype, "createUserEnvironment", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_environments_model_1.UserEnvironment, {
        description: 'Create a new global user environment for given user uid',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'variables',
        description: 'JSON string of the variables object',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, String]),
    __metadata("design:returntype", Promise)
], UserEnvironmentsResolver.prototype, "createUserGlobalEnvironment", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_environments_model_1.UserEnvironment, {
        description: 'Updates a users personal or global environment',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)({
        name: 'id',
        description: 'ID of the user environment',
        type: () => graphql_1.ID,
    })),
    __param(1, (0, graphql_1.Args)({
        name: 'name',
        description: 'Name of the User Environment, if global send an empty string',
    })),
    __param(2, (0, graphql_1.Args)({
        name: 'variables',
        description: 'JSON string of the variables object',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserEnvironmentsResolver.prototype, "updateUserEnvironment", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Deletes a users personal environment',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'id',
        description: 'ID of the user environment',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, String]),
    __metadata("design:returntype", Promise)
], UserEnvironmentsResolver.prototype, "deleteUserEnvironment", null);
__decorate([
    (0, graphql_1.Mutation)(() => Number, {
        description: 'Deletes all of users personal environments',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", Promise)
], UserEnvironmentsResolver.prototype, "deleteUserEnvironments", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_environments_model_1.UserEnvironment, {
        description: 'Deletes all variables inside a users global environment',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'id',
        description: 'ID of the users global environment',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, String]),
    __metadata("design:returntype", Promise)
], UserEnvironmentsResolver.prototype, "clearGlobalEnvironments", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_environments_model_1.UserEnvironment, {
        description: 'Listen for User Environment Creation',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", void 0)
], UserEnvironmentsResolver.prototype, "userEnvironmentCreated", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_environments_model_1.UserEnvironment, {
        description: 'Listen for User Environment updates',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", void 0)
], UserEnvironmentsResolver.prototype, "userEnvironmentUpdated", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_environments_model_1.UserEnvironment, {
        description: 'Listen for User Environment deletion',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", void 0)
], UserEnvironmentsResolver.prototype, "userEnvironmentDeleted", null);
__decorate([
    (0, graphql_1.Subscription)(() => Number, {
        description: 'Listen for User Environment DeleteMany',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", void 0)
], UserEnvironmentsResolver.prototype, "userEnvironmentDeleteMany", null);
UserEnvironmentsResolver = __decorate([
    (0, common_1.UseGuards)(gql_throttler_guard_1.GqlThrottlerGuard),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [user_environments_service_1.UserEnvironmentsService,
        pubsub_service_1.PubSubService])
], UserEnvironmentsResolver);
exports.UserEnvironmentsResolver = UserEnvironmentsResolver;
//# sourceMappingURL=user-environments.resolver.js.map