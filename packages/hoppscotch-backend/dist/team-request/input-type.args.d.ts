import { PaginationArgs } from 'src/types/input-types.args';
export declare class CreateTeamRequestInput {
    teamID: string;
    request: string;
    title: string;
}
export declare class UpdateTeamRequestInput {
    request?: string;
    title?: string;
}
export declare class SearchTeamRequestArgs extends PaginationArgs {
    teamID: string;
    searchTerm: string;
}
export declare class MoveTeamRequestArgs {
    srcCollID: string;
    requestID: string;
    destCollID: string;
    nextRequestID: string;
}
export declare class UpdateLookUpRequestOrderArgs {
    collectionID: string;
    nextRequestID: string;
    requestID: string;
}
export declare class GetTeamRequestInCollectionArgs extends PaginationArgs {
    collectionID: string;
}
