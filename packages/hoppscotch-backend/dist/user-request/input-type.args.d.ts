import { PaginationArgs } from 'src/types/input-types.args';
import { ReqType } from 'src/types/RequestTypes';
export declare class GetUserRequestArgs extends PaginationArgs {
    collectionID?: string;
}
export declare class MoveUserRequestArgs {
    sourceCollectionID: string;
    requestID: string;
    destinationCollectionID: string;
    nextRequestID: string;
}
export declare class CreateUserRequestArgs {
    collectionID: string;
    title: string;
    request: string;
    type: ReqType;
}
export declare class UpdateUserRequestArgs {
    title: string;
    request: string;
}
