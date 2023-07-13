import { ReqType } from 'src/types/RequestTypes';
export declare class UserRequest {
    id: string;
    collectionID: string;
    title: string;
    request: string;
    type: ReqType;
    createdOn: Date;
}
export declare class UserRequestReorderData {
    request: UserRequest;
    nextRequest?: UserRequest;
}
