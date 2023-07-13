import { ExecutionContext } from '@nestjs/common';
declare const GoogleSSOGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GoogleSSOGuard extends GoogleSSOGuard_base {
    getAuthenticateOptions(context: ExecutionContext): {
        state: {
            redirect_uri: any;
        };
    };
}
export {};
