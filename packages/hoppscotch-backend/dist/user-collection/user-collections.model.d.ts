import { ReqType } from 'src/types/RequestTypes';
export declare class UserCollection {
    id: string;
    title: string;
    type: ReqType;
    parentID: string | null;
    userID: string;
}
export declare class UserCollectionReorderData {
    userCollection: UserCollection;
    nextUserCollection?: UserCollection;
}
export declare class UserCollectionRemovedData {
    id: string;
    type: ReqType;
}
export declare class UserCollectionExportJSONData {
    exportedCollection: string;
    collectionType: ReqType;
}
