export declare type HoppGQLAuthNone = {
    authType: "none";
};
export declare type HoppGQLAuthBasic = {
    authType: "basic";
    username: string;
    password: string;
};
export declare type HoppGQLAuthBearer = {
    authType: "bearer";
    token: string;
};
export declare type HoppGQLAuthOAuth2 = {
    authType: "oauth-2";
    token: string;
    oidcDiscoveryURL: string;
    authURL: string;
    accessTokenURL: string;
    clientID: string;
    scope: string;
};
export declare type HoppGQLAuthAPIKey = {
    authType: "api-key";
    key: string;
    value: string;
    addTo: string;
};
export declare type HoppGQLAuth = {
    authActive: boolean;
} & (HoppGQLAuthNone | HoppGQLAuthBasic | HoppGQLAuthBearer | HoppGQLAuthOAuth2 | HoppGQLAuthAPIKey);
