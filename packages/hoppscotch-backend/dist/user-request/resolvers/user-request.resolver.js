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
exports.UserRequestResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const gql_user_decorator_1 = require("../../decorators/gql-user.decorator");
const gql_auth_guard_1 = require("../../guards/gql-auth.guard");
const pubsub_service_1 = require("../../pubsub/pubsub.service");
const E = require("fp-ts/Either");
const utils_1 = require("../../utils");
const user_request_model_1 = require("../user-request.model");
const user_request_service_1 = require("../user-request.service");
const input_type_args_1 = require("../input-type.args");
const user_model_1 = require("../../user/user.model");
const RequestTypes_1 = require("../../types/RequestTypes");
const gql_throttler_guard_1 = require("../../guards/gql-throttler.guard");
const throttler_1 = require("@nestjs/throttler");
let UserRequestResolver = class UserRequestResolver {
    constructor(userRequestService, pubSub) {
        this.userRequestService = userRequestService;
        this.pubSub = pubSub;
    }
    async user(user) {
        return user;
    }
    async userRESTRequests(user, args) {
        const requests = await this.userRequestService.fetchUserRequests(args.collectionID, RequestTypes_1.ReqType.REST, args.cursor, args.take, user);
        if (E.isLeft(requests))
            (0, utils_1.throwErr)(requests.left);
        return requests.right;
    }
    async userGQLRequests(user, args) {
        const requests = await this.userRequestService.fetchUserRequests(args.collectionID, RequestTypes_1.ReqType.GQL, args.cursor, args.take, user);
        if (E.isLeft(requests))
            (0, utils_1.throwErr)(requests.left);
        return requests.right;
    }
    async userRequest(user, id) {
        const request = await this.userRequestService.fetchUserRequest(id, user);
        if (E.isLeft(request))
            (0, utils_1.throwErr)(request.left);
        return request.right;
    }
    async createRESTUserRequest(user, args) {
        const request = await this.userRequestService.createRequest(args.collectionID, args.title, args.request, RequestTypes_1.ReqType.REST, user);
        if (E.isLeft(request))
            (0, utils_1.throwErr)(request.left);
        return request.right;
    }
    async createGQLUserRequest(user, args) {
        const request = await this.userRequestService.createRequest(args.collectionID, args.title, args.request, RequestTypes_1.ReqType.GQL, user);
        if (E.isLeft(request))
            (0, utils_1.throwErr)(request.left);
        return request.right;
    }
    async updateRESTUserRequest(user, id, args) {
        const request = await this.userRequestService.updateRequest(id, args.title, RequestTypes_1.ReqType.REST, args.request, user);
        if (E.isLeft(request))
            (0, utils_1.throwErr)(request.left);
        return request.right;
    }
    async updateGQLUserRequest(user, id, args) {
        const request = await this.userRequestService.updateRequest(id, args.title, RequestTypes_1.ReqType.GQL, args.request, user);
        if (E.isLeft(request))
            (0, utils_1.throwErr)(request.left);
        return request.right;
    }
    async deleteUserRequest(user, id) {
        const isDeleted = await this.userRequestService.deleteRequest(id, user);
        if (E.isLeft(isDeleted))
            (0, utils_1.throwErr)(isDeleted.left);
        return isDeleted.right;
    }
    async moveUserRequest(user, args) {
        const request = await this.userRequestService.moveRequest(args.sourceCollectionID, args.destinationCollectionID, args.requestID, args.nextRequestID, user);
        if (E.isLeft(request))
            (0, utils_1.throwErr)(request.left);
        return request.right;
    }
    userRequestCreated(user) {
        return this.pubSub.asyncIterator(`user_request/${user.uid}/created`);
    }
    userRequestUpdated(user) {
        return this.pubSub.asyncIterator(`user_request/${user.uid}/updated`);
    }
    userRequestDeleted(user) {
        return this.pubSub.asyncIterator(`user_request/${user.uid}/deleted`);
    }
    userRequestMoved(user) {
        return this.pubSub.asyncIterator(`user_request/${user.uid}/moved`);
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => user_model_1.User, {
        description: 'Returns the user of the user request',
    }),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserRequestResolver.prototype, "user", null);
__decorate([
    (0, graphql_1.Query)(() => [user_request_model_1.UserRequest], {
        description: 'Get REST user requests',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, input_type_args_1.GetUserRequestArgs]),
    __metadata("design:returntype", Promise)
], UserRequestResolver.prototype, "userRESTRequests", null);
__decorate([
    (0, graphql_1.Query)(() => [user_request_model_1.UserRequest], {
        description: 'Get GraphQL user requests',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, input_type_args_1.GetUserRequestArgs]),
    __metadata("design:returntype", Promise)
], UserRequestResolver.prototype, "userGQLRequests", null);
__decorate([
    (0, graphql_1.Query)(() => user_request_model_1.UserRequest, {
        description: 'Get a user request by ID',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'id',
        type: () => graphql_1.ID,
        description: 'ID of the user request',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserRequestResolver.prototype, "userRequest", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_request_model_1.UserRequest, {
        description: 'Create a new user REST request',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, input_type_args_1.CreateUserRequestArgs]),
    __metadata("design:returntype", Promise)
], UserRequestResolver.prototype, "createRESTUserRequest", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_request_model_1.UserRequest, {
        description: 'Create a new user GraphQL request',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, input_type_args_1.CreateUserRequestArgs]),
    __metadata("design:returntype", Promise)
], UserRequestResolver.prototype, "createGQLUserRequest", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_request_model_1.UserRequest, {
        description: 'Update a user REST request',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'id',
        description: 'ID of the user REST request',
        type: () => graphql_1.ID,
    })),
    __param(2, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, input_type_args_1.UpdateUserRequestArgs]),
    __metadata("design:returntype", Promise)
], UserRequestResolver.prototype, "updateRESTUserRequest", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_request_model_1.UserRequest, {
        description: 'Update a user GraphQL request',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'id',
        description: 'ID of the user GraphQL request',
        type: () => graphql_1.ID,
    })),
    __param(2, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, input_type_args_1.UpdateUserRequestArgs]),
    __metadata("design:returntype", Promise)
], UserRequestResolver.prototype, "updateGQLUserRequest", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Delete a user request',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'id',
        description: 'ID of the user request',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserRequestResolver.prototype, "deleteUserRequest", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_request_model_1.UserRequest, {
        description: 'Move and re-order of a user request within same or across collection',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, input_type_args_1.MoveUserRequestArgs]),
    __metadata("design:returntype", Promise)
], UserRequestResolver.prototype, "moveUserRequest", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_request_model_1.UserRequest, {
        description: 'Listen for User Request Creation',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserRequestResolver.prototype, "userRequestCreated", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_request_model_1.UserRequest, {
        description: 'Listen for User Request Update',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserRequestResolver.prototype, "userRequestUpdated", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_request_model_1.UserRequest, {
        description: 'Listen for User Request Deletion',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserRequestResolver.prototype, "userRequestDeleted", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_request_model_1.UserRequestReorderData, {
        description: 'Listen for User Request Moved',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserRequestResolver.prototype, "userRequestMoved", null);
UserRequestResolver = __decorate([
    (0, common_1.UseGuards)(gql_throttler_guard_1.GqlThrottlerGuard),
    (0, graphql_1.Resolver)(() => user_request_model_1.UserRequest),
    __metadata("design:paramtypes", [user_request_service_1.UserRequestService,
        pubsub_service_1.PubSubService])
], UserRequestResolver);
exports.UserRequestResolver = UserRequestResolver;
//# sourceMappingURL=user-request.resolver.js.map