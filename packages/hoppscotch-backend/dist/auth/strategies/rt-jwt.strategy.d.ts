import { Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { RefreshTokenPayload } from 'src/types/AuthTokens';
declare const RTJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class RTJwtStrategy extends RTJwtStrategy_base {
    private usersService;
    constructor(usersService: UserService);
    validate(payload: RefreshTokenPayload): Promise<import("@prisma/client").User>;
}
export {};
