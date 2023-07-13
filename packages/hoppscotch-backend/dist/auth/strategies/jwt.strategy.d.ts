import { Strategy } from 'passport-jwt';
import { AccessTokenPayload } from 'src/types/AuthTokens';
import { UserService } from 'src/user/user.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    constructor(usersService: UserService);
    validate(payload: AccessTokenPayload): Promise<import("@prisma/client").User>;
}
export {};
