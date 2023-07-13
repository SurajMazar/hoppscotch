/// <reference types="node" />
import * as Eq from "fp-ts/Eq";
import { ValidContentTypes } from "./content-types";
import { HoppRESTAuth } from "./HoppRESTAuth";
export * from "./content-types";
export * from "./HoppRESTAuth";
export declare const RESTReqSchemaVersion = "1";
export declare type HoppRESTParam = {
    key: string;
    value: string;
    active: boolean;
};
export declare type HoppRESTHeader = {
    key: string;
    value: string;
    active: boolean;
};
export declare type FormDataKeyValue = {
    key: string;
    active: boolean;
} & ({
    isFile: true;
    value: Blob[];
} | {
    isFile: false;
    value: string;
});
export declare type HoppRESTReqBodyFormData = {
    contentType: "multipart/form-data";
    body: FormDataKeyValue[];
};
export declare type HoppRESTReqBody = {
    contentType: Exclude<ValidContentTypes, "multipart/form-data">;
    body: string;
} | HoppRESTReqBodyFormData | {
    contentType: null;
    body: null;
};
export interface HoppRESTRequest {
    v: string;
    id?: string;
    name: string;
    method: string;
    endpoint: string;
    params: HoppRESTParam[];
    headers: HoppRESTHeader[];
    preRequestScript: string;
    testScript: string;
    auth: HoppRESTAuth;
    body: HoppRESTReqBody;
}
export declare const HoppRESTRequestEq: Eq.Eq<{
    readonly v: string;
    readonly id?: string | undefined;
    readonly name: string;
    readonly method: string;
    readonly endpoint: string;
    readonly params: HoppRESTParam[];
    readonly headers: HoppRESTHeader[];
    readonly preRequestScript: string;
    readonly testScript: string;
    readonly auth: HoppRESTAuth;
    readonly body: HoppRESTReqBody;
}>;
export declare const isEqualHoppRESTRequest: (x: {
    readonly v: string;
    readonly id?: string | undefined;
    readonly name: string;
    readonly method: string;
    readonly endpoint: string;
    readonly params: HoppRESTParam[];
    readonly headers: HoppRESTHeader[];
    readonly preRequestScript: string;
    readonly testScript: string;
    readonly auth: HoppRESTAuth;
    readonly body: HoppRESTReqBody;
}, y: {
    readonly v: string;
    readonly id?: string | undefined;
    readonly name: string;
    readonly method: string;
    readonly endpoint: string;
    readonly params: HoppRESTParam[];
    readonly headers: HoppRESTHeader[];
    readonly preRequestScript: string;
    readonly testScript: string;
    readonly auth: HoppRESTAuth;
    readonly body: HoppRESTReqBody;
}) => boolean;
/**
 * Safely tries to extract REST Request data from an unknown value.
 * If we fail to detect certain bits, we just resolve it to the default value
 * @param x The value to extract REST Request data from
 * @param defaultReq The default REST Request to source from
 */
export declare function safelyExtractRESTRequest(x: unknown, defaultReq: HoppRESTRequest): HoppRESTRequest;
export declare function makeRESTRequest(x: Omit<HoppRESTRequest, "v">): HoppRESTRequest;
export declare function isHoppRESTRequest(x: any): x is HoppRESTRequest;
export declare function translateToNewRequest(x: any): HoppRESTRequest;
export declare function parseOldAuth(x: any): HoppRESTAuth;
