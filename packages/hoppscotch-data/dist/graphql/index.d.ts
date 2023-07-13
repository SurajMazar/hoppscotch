import { HoppGQLAuth } from "./HoppGQLAuth";
export * from "./HoppGQLAuth";
export declare const GQL_REQ_SCHEMA_VERSION = 2;
export declare type GQLHeader = {
    key: string;
    value: string;
    active: boolean;
};
export declare type HoppGQLRequest = {
    id?: string;
    v: number;
    name: string;
    url: string;
    headers: GQLHeader[];
    query: string;
    variables: string;
    auth: HoppGQLAuth;
};
export declare function translateToGQLRequest(x: any): HoppGQLRequest;
export declare function makeGQLRequest(x: Omit<HoppGQLRequest, "v">): HoppGQLRequest;
