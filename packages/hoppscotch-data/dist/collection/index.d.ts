import { HoppGQLRequest } from "../graphql";
import { HoppRESTRequest } from "../rest";
declare type SupportedReqTypes = HoppRESTRequest | HoppGQLRequest;
export declare type HoppCollection<T extends SupportedReqTypes> = {
    v: number;
    name: string;
    folders: HoppCollection<T>[];
    requests: T[];
    id?: string;
};
/**
 * Generates a Collection object. This ignores the version number object
 * so it can be incremented independently without updating it everywhere
 * @param x The Collection Data
 * @returns The final collection
 */
export declare function makeCollection<T extends SupportedReqTypes>(x: Omit<HoppCollection<T>, "v">): HoppCollection<T>;
/**
 * Translates an old collection to a new collection
 * @param x The collection object to load
 * @returns The proper new collection format
 */
export declare function translateToNewRESTCollection(x: any): HoppCollection<HoppRESTRequest>;
/**
 * Translates an old collection to a new collection
 * @param x The collection object to load
 * @returns The proper new collection format
 */
export declare function translateToNewGQLCollection(x: any): HoppCollection<HoppGQLRequest>;
export {};
