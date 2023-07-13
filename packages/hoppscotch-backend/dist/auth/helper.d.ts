import { AuthError } from 'src/types/AuthError';
import { AuthTokens } from 'src/types/AuthTokens';
import { Response } from 'express';
export declare enum Origin {
    ADMIN = "admin",
    APP = "app"
}
export declare function throwHTTPErr(errorData: AuthError): never;
export declare const authCookieHandler: (res: Response, authTokens: AuthTokens, redirect: boolean, redirectUrl: string | null) => void | Response<any, Record<string, any>>;
export declare const subscriptionContextCookieParser: (rawCookies: string) => AuthTokens;
