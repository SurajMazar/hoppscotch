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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTJwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/user.service");
const errors_1 = require("../../errors");
const O = require("fp-ts/Option");
let RTJwtStrategy = class RTJwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh') {
    constructor(usersService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    const RTCookie = request.cookies['refresh_token'];
                    if (!RTCookie) {
                        throw new common_1.ForbiddenException(errors_1.COOKIES_NOT_FOUND);
                    }
                    return RTCookie;
                },
            ]),
            secretOrKey: process.env.JWT_SECRET,
        });
        this.usersService = usersService;
    }
    async validate(payload) {
        if (!payload)
            throw new common_1.ForbiddenException(errors_1.INVALID_REFRESH_TOKEN);
        const user = await this.usersService.findUserById(payload.sub);
        if (O.isNone(user)) {
            throw new common_1.UnauthorizedException(errors_1.USER_NOT_FOUND);
        }
        return user.value;
    }
};
RTJwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], RTJwtStrategy);
exports.RTJwtStrategy = RTJwtStrategy;
//# sourceMappingURL=rt-jwt.strategy.js.map