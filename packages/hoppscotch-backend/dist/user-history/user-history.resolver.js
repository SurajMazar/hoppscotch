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
exports.UserHistoryResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_history_service_1 = require("./user-history.service");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const user_history_model_1 = require("./user-history.model");
const RequestTypes_1 = require("../types/RequestTypes");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../guards/gql-auth.guard");
const gql_user_decorator_1 = require("../decorators/gql-user.decorator");
const user_model_1 = require("../user/user.model");
const utils_1 = require("../utils");
const E = require("fp-ts/Either");
const gql_throttler_guard_1 = require("../guards/gql-throttler.guard");
const throttler_1 = require("@nestjs/throttler");
let UserHistoryResolver = class UserHistoryResolver {
    constructor(userHistoryService, pubsub) {
        this.userHistoryService = userHistoryService;
        this.pubsub = pubsub;
    }
    async createUserHistory(user, reqData, resMetadata, reqType) {
        const createdHistory = await this.userHistoryService.createUserHistory(user.uid, reqData, resMetadata, reqType);
        if (E.isLeft(createdHistory))
            (0, utils_1.throwErr)(createdHistory.left);
        return createdHistory.right;
    }
    async toggleHistoryStarStatus(user, id) {
        const updatedHistory = await this.userHistoryService.toggleHistoryStarStatus(user.uid, id);
        if (E.isLeft(updatedHistory))
            (0, utils_1.throwErr)(updatedHistory.left);
        return updatedHistory.right;
    }
    async removeRequestFromHistory(user, id) {
        const deletedHistory = await this.userHistoryService.removeRequestFromHistory(user.uid, id);
        if (E.isLeft(deletedHistory))
            (0, utils_1.throwErr)(deletedHistory.left);
        return deletedHistory.right;
    }
    async deleteAllUserHistory(user, reqType) {
        const deletedHistory = await this.userHistoryService.deleteAllUserHistory(user.uid, reqType);
        if (E.isLeft(deletedHistory))
            (0, utils_1.throwErr)(deletedHistory.left);
        return deletedHistory.right;
    }
    userHistoryCreated(user) {
        return this.pubsub.asyncIterator(`user_history/${user.uid}/created`);
    }
    userHistoryUpdated(user) {
        return this.pubsub.asyncIterator(`user_history/${user.uid}/updated`);
    }
    userHistoryDeleted(user) {
        return this.pubsub.asyncIterator(`user_history/${user.uid}/deleted`);
    }
    userHistoryDeletedMany(user) {
        return this.pubsub.asyncIterator(`user_history/${user.uid}/deleted_many`);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => user_history_model_1.UserHistory, {
        description: 'Adds a new REST/GQL request to user history',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'reqData',
        description: 'JSON string of the request data',
    })),
    __param(2, (0, graphql_1.Args)({
        name: 'resMetadata',
        description: 'JSON string of the response metadata',
    })),
    __param(3, (0, graphql_1.Args)({
        name: 'reqType',
        description: 'Request type, REST or GQL',
        type: () => RequestTypes_1.ReqType,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, String, String, String]),
    __metadata("design:returntype", Promise)
], UserHistoryResolver.prototype, "createUserHistory", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_history_model_1.UserHistory, {
        description: 'Stars/Unstars a REST/GQL request in user history',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'id',
        description: 'ID of User History',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, String]),
    __metadata("design:returntype", Promise)
], UserHistoryResolver.prototype, "toggleHistoryStarStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_history_model_1.UserHistory, {
        description: 'Removes a REST/GQL request from user history',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'id',
        description: 'ID of User History',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, String]),
    __metadata("design:returntype", Promise)
], UserHistoryResolver.prototype, "removeRequestFromHistory", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_history_model_1.UserHistoryDeletedManyData, {
        description: 'Deletes all REST/GQL history for a user based on Request type',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'reqType',
        description: 'Request type, REST or GQL',
        type: () => RequestTypes_1.ReqType,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, String]),
    __metadata("design:returntype", Promise)
], UserHistoryResolver.prototype, "deleteAllUserHistory", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_history_model_1.UserHistory, {
        description: 'Listen for User History Creation',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", void 0)
], UserHistoryResolver.prototype, "userHistoryCreated", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_history_model_1.UserHistory, {
        description: 'Listen for User History update',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", void 0)
], UserHistoryResolver.prototype, "userHistoryUpdated", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_history_model_1.UserHistory, {
        description: 'Listen for User History deletion',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", void 0)
], UserHistoryResolver.prototype, "userHistoryDeleted", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_history_model_1.UserHistoryDeletedManyData, {
        description: 'Listen for User History deleted many',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", void 0)
], UserHistoryResolver.prototype, "userHistoryDeletedMany", null);
UserHistoryResolver = __decorate([
    (0, common_1.UseGuards)(gql_throttler_guard_1.GqlThrottlerGuard),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [user_history_service_1.UserHistoryService,
        pubsub_service_1.PubSubService])
], UserHistoryResolver);
exports.UserHistoryResolver = UserHistoryResolver;
//# sourceMappingURL=user-history.resolver.js.map