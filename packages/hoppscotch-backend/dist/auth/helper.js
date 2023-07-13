"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionContextCookieParser = exports.authCookieHandler = exports.throwHTTPErr = exports.Origin = void 0;
const common_1 = require("@nestjs/common");
const luxon_1 = require("luxon");
const cookie = require("cookie");
const errors_1 = require("../errors");
var AuthTokenType;
(function (AuthTokenType) {
    AuthTokenType["ACCESS_TOKEN"] = "access_token";
    AuthTokenType["REFRESH_TOKEN"] = "refresh_token";
})(AuthTokenType || (AuthTokenType = {}));
var Origin;
(function (Origin) {
    Origin["ADMIN"] = "admin";
    Origin["APP"] = "app";
})(Origin = exports.Origin || (exports.Origin = {}));
function throwHTTPErr(errorData) {
    const { message, statusCode } = errorData;
    throw new common_1.HttpException(message, statusCode);
}
exports.throwHTTPErr = throwHTTPErr;
const authCookieHandler = (res, authTokens, redirect, redirectUrl) => {
    const currentTime = luxon_1.DateTime.now();
    const accessTokenValidity = currentTime
        .plus({
        milliseconds: parseInt(process.env.ACCESS_TOKEN_VALIDITY),
    })
        .toMillis();
    const refreshTokenValidity = currentTime
        .plus({
        milliseconds: parseInt(process.env.REFRESH_TOKEN_VALIDITY),
    })
        .toMillis();
    res.cookie(AuthTokenType.ACCESS_TOKEN, authTokens.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: accessTokenValidity,
    });
    res.cookie(AuthTokenType.REFRESH_TOKEN, authTokens.refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: refreshTokenValidity,
    });
    if (!redirect) {
        return res.status(common_1.HttpStatus.OK).send();
    }
    const whitelistedOrigins = process.env.WHITELISTED_ORIGINS.split(',');
    if (!whitelistedOrigins.includes(redirectUrl))
        redirectUrl = process.env.REDIRECT_URL;
    return res.status(common_1.HttpStatus.OK).redirect(redirectUrl);
};
exports.authCookieHandler = authCookieHandler;
const subscriptionContextCookieParser = (rawCookies) => {
    const cookies = cookie.parse(rawCookies);
    if (!cookies[AuthTokenType.ACCESS_TOKEN] &&
        !cookies[AuthTokenType.REFRESH_TOKEN]) {
        throw new common_1.HttpException(errors_1.COOKIES_NOT_FOUND, 400, {
            cause: new Error(errors_1.COOKIES_NOT_FOUND),
        });
    }
    return {
        access_token: cookies[AuthTokenType.ACCESS_TOKEN],
        refresh_token: cookies[AuthTokenType.REFRESH_TOKEN],
    };
};
exports.subscriptionContextCookieParser = subscriptionContextCookieParser;
//# sourceMappingURL=helper.js.map