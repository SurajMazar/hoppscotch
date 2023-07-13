import { Strategy } from 'passport-microsoft';
import { AuthService } from '../auth.service';
import { UserService } from 'src/user/user.service';
declare const MicrosoftStrategy_base: new (...args: any[]) => Strategy;
export declare class MicrosoftStrategy extends MicrosoftStrategy_base {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UserService);
    validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<import("@prisma/client").User>;
}
export {};
