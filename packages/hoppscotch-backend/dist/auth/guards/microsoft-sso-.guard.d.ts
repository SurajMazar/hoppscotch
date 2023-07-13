import { ExecutionContext } from '@nestjs/common';
declare const MicrosoftSSOGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class MicrosoftSSOGuard extends MicrosoftSSOGuard_base {
    getAuthenticateOptions(context: ExecutionContext): {
        state: {
            redirect_uri: any;
        };
    };
}
export {};
