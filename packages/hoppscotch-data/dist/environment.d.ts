import * as E from "fp-ts/Either";
export declare type Environment = {
    id?: string;
    name: string;
    variables: {
        key: string;
        value: string;
    }[];
};
export declare function parseBodyEnvVariablesE(body: string, env: Environment["variables"]): E.Left<"ENV_EXPAND_LOOP"> | E.Right<string>;
/**
 * @deprecated Use `parseBodyEnvVariablesE` instead.
 */
export declare const parseBodyEnvVariables: (body: string, env: Environment["variables"]) => string;
export declare function parseTemplateStringE(str: string, variables: Environment["variables"]): E.Left<"ENV_EXPAND_LOOP"> | E.Right<string>;
/**
 * @deprecated Use `parseTemplateStringE` instead
 */
export declare const parseTemplateString: (str: string, variables: Environment["variables"]) => string;
