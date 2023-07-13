export declare const knownContentTypes: {
    "application/json": string;
    "application/ld+json": string;
    "application/hal+json": string;
    "application/vnd.api+json": string;
    "application/xml": string;
    "application/x-www-form-urlencoded": string;
    "multipart/form-data": string;
    "text/html": string;
    "text/plain": string;
};
export declare type ValidContentTypes = keyof typeof knownContentTypes;
