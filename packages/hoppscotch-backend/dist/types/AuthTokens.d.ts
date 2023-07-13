export interface AccessTokenPayload {
    iss: string;
    sub: string;
    aud: [string];
    iat?: number;
}
export interface RefreshTokenPayload {
    iss: string;
    sub: string;
    aud: [string];
    iat?: number;
}
export type AuthTokens = {
    access_token: string;
    refresh_token: string;
};
export declare enum AuthTokenType {
    ACCESS_TOKEN = "access_token",
    REFRESH_TOKEN = "refresh_token"
}
