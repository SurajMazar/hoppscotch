import { ReqType } from 'src/types/RequestTypes';
export declare class UserHistory {
    id: string;
    userUid: string;
    reqType: ReqType;
    request: string;
    responseMetadata: string;
    isStarred: boolean;
    executedOn: Date;
}
export declare class UserHistoryDeletedManyData {
    count: number;
    reqType: ReqType;
}
