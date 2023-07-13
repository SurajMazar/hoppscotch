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
exports.ShortcodeResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const E = require("fp-ts/Either");
const common_1 = require("@nestjs/common");
const shortcode_model_1 = require("./shortcode.model");
const shortcode_service_1 = require("./shortcode.service");
const user_service_1 = require("../user/user.service");
const utils_1 = require("../utils");
const gql_user_decorator_1 = require("../decorators/gql-user.decorator");
const gql_auth_guard_1 = require("../guards/gql-auth.guard");
const user_model_1 = require("../user/user.model");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const jwt_1 = require("@nestjs/jwt");
const input_types_args_1 = require("../types/input-types.args");
const gql_throttler_guard_1 = require("../guards/gql-throttler.guard");
const throttler_1 = require("@nestjs/throttler");
let ShortcodeResolver = class ShortcodeResolver {
    constructor(shortcodeService, userService, pubsub, jwtService) {
        this.shortcodeService = shortcodeService;
        this.userService = userService;
        this.pubsub = pubsub;
        this.jwtService = jwtService;
    }
    async shortcode(code) {
        const result = await this.shortcodeService.getShortCode(code);
        if (E.isLeft(result))
            (0, utils_1.throwErr)(result.left);
        return result.right;
    }
    async myShortcodes(user, args) {
        return this.shortcodeService.fetchUserShortCodes(user.uid, args);
    }
    async createShortcode(request, ctx) {
        const decodedAccessToken = this.jwtService.verify(ctx.req.cookies['access_token']);
        const result = await this.shortcodeService.createShortcode(request, decodedAccessToken === null || decodedAccessToken === void 0 ? void 0 : decodedAccessToken.sub);
        if (E.isLeft(result))
            (0, utils_1.throwErr)(result.left);
        return result.right;
    }
    async revokeShortcode(user, code) {
        const result = await this.shortcodeService.revokeShortCode(code, user.uid);
        if (E.isLeft(result))
            (0, utils_1.throwErr)(result.left);
        return result.right;
    }
    myShortcodesCreated(user) {
        return this.pubsub.asyncIterator(`shortcode/${user.uid}/created`);
    }
    myShortcodesRevoked(user) {
        return this.pubsub.asyncIterator(`shortcode/${user.uid}/revoked`);
    }
};
__decorate([
    (0, graphql_1.Query)(() => shortcode_model_1.Shortcode, {
        description: 'Resolves and returns a shortcode data',
        nullable: true,
    }),
    __param(0, (0, graphql_1.Args)({
        name: 'code',
        type: () => graphql_1.ID,
        description: 'The shortcode to resolve',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShortcodeResolver.prototype, "shortcode", null);
__decorate([
    (0, graphql_1.Query)(() => [shortcode_model_1.Shortcode], {
        description: 'List all shortcodes the current user has generated',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, input_types_args_1.PaginationArgs]),
    __metadata("design:returntype", Promise)
], ShortcodeResolver.prototype, "myShortcodes", null);
__decorate([
    (0, graphql_1.Mutation)(() => shortcode_model_1.Shortcode, {
        description: 'Create a shortcode for the given request.',
    }),
    __param(0, (0, graphql_1.Args)({
        name: 'request',
        description: 'JSON string of the request object',
    })),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShortcodeResolver.prototype, "createShortcode", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Revoke a user generated shortcode',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'code',
        type: () => graphql_1.ID,
        description: 'The shortcode to resolve',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, String]),
    __metadata("design:returntype", Promise)
], ShortcodeResolver.prototype, "revokeShortcode", null);
__decorate([
    (0, graphql_1.Subscription)(() => shortcode_model_1.Shortcode, {
        description: 'Listen for shortcode creation',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ShortcodeResolver.prototype, "myShortcodesCreated", null);
__decorate([
    (0, graphql_1.Subscription)(() => shortcode_model_1.Shortcode, {
        description: 'Listen for shortcode deletion',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ShortcodeResolver.prototype, "myShortcodesRevoked", null);
ShortcodeResolver = __decorate([
    (0, common_1.UseGuards)(gql_throttler_guard_1.GqlThrottlerGuard),
    (0, graphql_1.Resolver)(() => shortcode_model_1.Shortcode),
    __metadata("design:paramtypes", [shortcode_service_1.ShortcodeService,
        user_service_1.UserService,
        pubsub_service_1.PubSubService,
        jwt_1.JwtService])
], ShortcodeResolver);
exports.ShortcodeResolver = ShortcodeResolver;
//# sourceMappingURL=shortcode.resolver.js.map