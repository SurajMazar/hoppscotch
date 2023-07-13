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
exports.UserHistoryUserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_model_1 = require("../user/user.model");
const user_history_service_1 = require("./user-history.service");
const user_history_model_1 = require("./user-history.model");
const RequestTypes_1 = require("../types/RequestTypes");
const input_types_args_1 = require("../types/input-types.args");
let UserHistoryUserResolver = class UserHistoryUserResolver {
    constructor(userHistoryService) {
        this.userHistoryService = userHistoryService;
    }
    async RESTHistory(user, args) {
        return await this.userHistoryService.fetchUserHistory(user.uid, args.take, RequestTypes_1.ReqType.REST);
    }
    async GQLHistory(user, args) {
        return await this.userHistoryService.fetchUserHistory(user.uid, args.take, RequestTypes_1.ReqType.GQL);
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => [user_history_model_1.UserHistory], {
        description: 'Returns a users REST history',
    }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User,
        input_types_args_1.PaginationArgs]),
    __metadata("design:returntype", Promise)
], UserHistoryUserResolver.prototype, "RESTHistory", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [user_history_model_1.UserHistory], {
        description: 'Returns a users GraphQL history',
    }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User,
        input_types_args_1.PaginationArgs]),
    __metadata("design:returntype", Promise)
], UserHistoryUserResolver.prototype, "GQLHistory", null);
UserHistoryUserResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_model_1.User),
    __metadata("design:paramtypes", [user_history_service_1.UserHistoryService])
], UserHistoryUserResolver);
exports.UserHistoryUserResolver = UserHistoryUserResolver;
//# sourceMappingURL=user.resolver.js.map