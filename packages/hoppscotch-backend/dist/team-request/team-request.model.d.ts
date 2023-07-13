export declare class TeamRequest {
    id: string;
    collectionID: string;
    teamID: string;
    request: string;
    title: string;
}
export declare class RequestReorderData {
    request: TeamRequest;
    nextRequest?: TeamRequest;
}
