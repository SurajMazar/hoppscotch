export declare class User {
    uid: string;
    displayName?: string;
    email?: string;
    photoURL?: string;
    isAdmin: boolean;
    createdOn: Date;
    currentRESTSession?: string;
    currentGQLSession?: string;
}
export declare enum SessionType {
    REST = "REST",
    GQL = "GQL"
}
