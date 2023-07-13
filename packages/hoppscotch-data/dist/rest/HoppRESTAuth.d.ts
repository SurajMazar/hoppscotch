export declare type HoppRESTAuthNone = {
    authType: "none";
};
export declare type HoppRESTAuthBasic = {
    authType: "basic";
    username: string;
    password: string;
};
export declare type HoppRESTAuthBearer = {
    authType: "bearer";
    token: string;
};
export declare type HoppRESTAuthOAuth2 = {
    authType: "oauth-2";
    token: string;
    oidcDiscoveryURL: string;
    authURL: string;
    accessTokenURL: string;
    clientID: string;
    scope: string;
};
export declare type HoppRESTAuthAPIKey = {
    authType: "api-key";
    key: string;
    value: string;
    addTo: string;
};
export declare type HoppRESTAuth = {
    authActive: boolean;
} & (HoppRESTAuthNone | HoppRESTAuthBasic | HoppRESTAuthBearer | HoppRESTAuthOAuth2 | HoppRESTAuthAPIKey);
