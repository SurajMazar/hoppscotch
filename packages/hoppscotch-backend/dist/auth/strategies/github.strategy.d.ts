import { Strategy } from 'passport-github2';
import { AuthService } from '../auth.service';
import { UserService } from 'src/user/user.service';
declare const GithubStrategy_base: new (...args: any[]) => Strategy;
export declare class GithubStrategy extends GithubStrategy_base {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UserService);
    validate(accessToken: any, refreshToken: any, profile: any, done: any): Promise<import("@prisma/client").User>;
}
export {};
