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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_model_1 = require("./user.model");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../guards/gql-auth.guard");
const gql_user_decorator_1 = require("../decorators/gql-user.decorator");
const user_service_1 = require("./user.service");
const utils_1 = require("../utils");
const E = require("fp-ts/lib/Either");
const TE = require("fp-ts/TaskEither");
const function_1 = require("fp-ts/function");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const gql_throttler_guard_1 = require("../guards/gql-throttler.guard");
const throttler_1 = require("@nestjs/throttler");
let UserResolver = class UserResolver {
    constructor(userService, pubsub) {
        this.userService = userService;
        this.pubsub = pubsub;
    }
    me(user) {
        return this.userService.convertDbUserToUser(user);
    }
    async updateUserSessions(user, currentSession, sessionType) {
        const updatedUser = await this.userService.updateUserSessions(user, currentSession, sessionType);
        if (E.isLeft(updatedUser))
            (0, utils_1.throwErr)(updatedUser.left);
        return updatedUser.right;
    }
    deleteUser(user) {
        return (0, function_1.pipe)(this.userService.deleteUserByUID(user), TE.map(() => true), TE.mapLeft((message) => message.toString()), TE.getOrElse(utils_1.throwErr))();
    }
    userUpdated(user) {
        return this.pubsub.asyncIterator(`user/${user.uid}/updated`);
    }
    userDeleted(user) {
        return this.pubsub.asyncIterator(`user/${user.uid}/deleted`);
    }
};
__decorate([
    (0, graphql_1.Query)(() => user_model_1.User, {
        description: "Gives details of the user executing this query (pass Authorization 'Bearer' header)",
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "me", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_model_1.User, {
        description: 'Update user sessions',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'currentSession',
        description: 'JSON string of the saved REST/GQL session',
    })),
    __param(2, (0, graphql_1.Args)({
        name: 'sessionType',
        description: 'Type of the session',
        type: () => user_model_1.SessionType,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUserSessions", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Delete an user account',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_model_1.User, {
        description: 'Listen for user updates',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "userUpdated", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_model_1.User, {
        description: 'Listen for user deletion',
        resolve: (value) => value,
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", Object)
], UserResolver.prototype, "userDeleted", null);
UserResolver = __decorate([
    (0, common_1.UseGuards)(gql_throttler_guard_1.GqlThrottlerGuard),
    (0, graphql_1.Resolver)(() => user_model_1.User),
    __metadata("design:paramtypes", [user_service_1.UserService,
        pubsub_service_1.PubSubService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map