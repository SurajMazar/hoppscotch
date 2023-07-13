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
exports.UserRequestUserCollectionResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const E = require("fp-ts/Either");
const utils_1 = require("../../utils");
const user_request_service_1 = require("../user-request.service");
const user_request_model_1 = require("../user-request.model");
const user_collections_model_1 = require("../../user-collection/user-collections.model");
const input_types_args_1 = require("../../types/input-types.args");
let UserRequestUserCollectionResolver = class UserRequestUserCollectionResolver {
    constructor(userRequestService) {
        this.userRequestService = userRequestService;
    }
    async requests(user, collection, args) {
        const requests = await this.userRequestService.fetchUserRequests(collection.id, collection.type, args.cursor, args.take, user);
        if (E.isLeft(requests))
            (0, utils_1.throwErr)(requests.left);
        return requests.right;
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => [user_request_model_1.UserRequest], {
        description: 'Returns user requests of a user collection',
    }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Parent)()),
    __param(2, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_collections_model_1.UserCollection,
        input_types_args_1.PaginationArgs]),
    __metadata("design:returntype", Promise)
], UserRequestUserCollectionResolver.prototype, "requests", null);
UserRequestUserCollectionResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_collections_model_1.UserCollection),
    __metadata("design:paramtypes", [user_request_service_1.UserRequestService])
], UserRequestUserCollectionResolver);
exports.UserRequestUserCollectionResolver = UserRequestUserCollectionResolver;
//# sourceMappingURL=user-collection.resolver.js.map