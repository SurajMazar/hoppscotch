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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const signin_magic_dto_1 = require("./dto/signin-magic.dto");
const verify_magic_dto_1 = require("./dto/verify-magic.dto");
const E = require("fp-ts/Either");
const rt_jwt_auth_guard_1 = require("./guards/rt-jwt-auth.guard");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const gql_user_decorator_1 = require("../decorators/gql-user.decorator");
const rt_cookie_decorator_1 = require("../decorators/rt-cookie.decorator");
const helper_1 = require("./helper");
const google_sso_guard_1 = require("./guards/google-sso.guard");
const github_sso_guard_1 = require("./guards/github-sso.guard");
const microsoft_sso__guard_1 = require("./guards/microsoft-sso-.guard");
const throttler_behind_proxy_guard_1 = require("../guards/throttler-behind-proxy.guard");
const throttler_1 = require("@nestjs/throttler");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signInMagicLink(authData, origin) {
        const deviceIdToken = await this.authService.signInMagicLink(authData.email, origin);
        if (E.isLeft(deviceIdToken))
            (0, helper_1.throwHTTPErr)(deviceIdToken.left);
        return deviceIdToken.right;
    }
    async verify(data, res) {
        const authTokens = await this.authService.verifyMagicLinkTokens(data);
        if (E.isLeft(authTokens))
            (0, helper_1.throwHTTPErr)(authTokens.left);
        (0, helper_1.authCookieHandler)(res, authTokens.right, false, null);
    }
    async refresh(user, refresh_token, res) {
        const newTokenPair = await this.authService.refreshAuthTokens(refresh_token, user);
        if (E.isLeft(newTokenPair))
            (0, helper_1.throwHTTPErr)(newTokenPair.left);
        (0, helper_1.authCookieHandler)(res, newTokenPair.right, false, null);
    }
    async googleAuth(req) { }
    async googleAuthRedirect(req, res) {
        const authTokens = await this.authService.generateAuthTokens(req.user.uid);
        if (E.isLeft(authTokens))
            (0, helper_1.throwHTTPErr)(authTokens.left);
        (0, helper_1.authCookieHandler)(res, authTokens.right, true, req.authInfo.state.redirect_uri);
    }
    async githubAuth(req) { }
    async githubAuthRedirect(req, res) {
        const authTokens = await this.authService.generateAuthTokens(req.user.uid);
        if (E.isLeft(authTokens))
            (0, helper_1.throwHTTPErr)(authTokens.left);
        (0, helper_1.authCookieHandler)(res, authTokens.right, true, req.authInfo.state.redirect_uri);
    }
    async microsoftAuth(req) { }
    async microsoftAuthRedirect(req, res) {
        const authTokens = await this.authService.generateAuthTokens(req.user.uid);
        if (E.isLeft(authTokens))
            (0, helper_1.throwHTTPErr)(authTokens.left);
        (0, helper_1.authCookieHandler)(res, authTokens.right, true, req.authInfo.state.redirect_uri);
    }
    async logout(res) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        return res.status(200).send();
    }
    async verifyAdmin(user) {
        const userInfo = await this.authService.verifyAdmin(user);
        if (E.isLeft(userInfo))
            (0, helper_1.throwHTTPErr)(userInfo.left);
        return userInfo.right;
    }
};
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('origin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_magic_dto_1.SignInMagicDto, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signInMagicLink", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_magic_dto_1.VerifyMagicDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verify", null);
__decorate([
    (0, common_1.Get)('refresh'),
    (0, common_1.UseGuards)(rt_jwt_auth_guard_1.RTJwtAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, rt_cookie_decorator_1.RTCookie)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)(google_sso_guard_1.GoogleSSOGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(google_sso_guard_1.GoogleSSOGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.Get)('github'),
    (0, common_1.UseGuards)(github_sso_guard_1.GithubSSOGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "githubAuth", null);
__decorate([
    (0, common_1.Get)('github/callback'),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(github_sso_guard_1.GithubSSOGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "githubAuthRedirect", null);
__decorate([
    (0, common_1.Get)('microsoft'),
    (0, common_1.UseGuards)(microsoft_sso__guard_1.MicrosoftSSOGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "microsoftAuth", null);
__decorate([
    (0, common_1.Get)('microsoft/callback'),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(microsoft_sso__guard_1.MicrosoftSSOGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "microsoftAuthRedirect", null);
__decorate([
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('verify/admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyAdmin", null);
AuthController = __decorate([
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, common_1.Controller)({ path: 'auth', version: '1' }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map