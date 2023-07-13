import { ExecutionContext } from '@nestjs/common';
declare const GithubSSOGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GithubSSOGuard extends GithubSSOGuard_base {
    getAuthenticateOptions(context: ExecutionContext): {
        state: {
            redirect_uri: any;
        };
    };
}
export {};
