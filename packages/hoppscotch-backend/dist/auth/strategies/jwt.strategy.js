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
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/user.service");
const O = require("fp-ts/Option");
const errors_1 = require("../../errors");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(usersService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    const ATCookie = request.cookies['access_token'];
                    if (!ATCookie) {
                        throw new common_1.ForbiddenException(errors_1.COOKIES_NOT_FOUND);
                    }
                    return ATCookie;
                },
            ]),
            secretOrKey: process.env.JWT_SECRET,
        });
        this.usersService = usersService;
    }
    async validate(payload) {
        if (!payload)
            throw new common_1.ForbiddenException(errors_1.INVALID_ACCESS_TOKEN);
        const user = await this.usersService.findUserById(payload.sub);
        if (O.isNone(user)) {
            throw new common_1.UnauthorizedException(errors_1.USER_NOT_FOUND);
        }
        return user.value;
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map