import { TeamRequest } from './team-request.model';
import { CreateTeamRequestInput, UpdateTeamRequestInput, SearchTeamRequestArgs, GetTeamRequestInCollectionArgs, MoveTeamRequestArgs, UpdateLookUpRequestOrderArgs } from './input-type.args';
import { Team } from '../team/team.model';
import { TeamRequestService } from './team-request.service';
import { PubSubService } from 'src/pubsub/pubsub.service';
export declare class TeamRequestResolver {
    private readonly teamRequestService;
    private readonly pubsub;
    constructor(teamRequestService: TeamRequestService, pubsub: PubSubService);
    team(req: TeamRequest): Promise<Team>;
    collection(req: TeamRequest): Promise<import("@prisma/client").TeamCollection>;
    searchForRequest(args: SearchTeamRequestArgs): Promise<{
        id: string;
        collectionID: string;
        teamID: string;
        title: string;
        request: string;
    }[]>;
    request(requestID: string): Promise<{
        id: string;
        collectionID: string;
        teamID: string;
        title: string;
        request: string;
    }>;
    requestsInCollection(input: GetTeamRequestInCollectionArgs): Promise<{
        id: string;
        collectionID: string;
        teamID: string;
        title: string;
        request: string;
    }[]>;
    createRequestInCollection(collectionID: string, data: CreateTeamRequestInput): Promise<{
        id: string;
        collectionID: string;
        teamID: string;
        title: string;
        request: string;
    }>;
    updateRequest(requestID: string, data: UpdateTeamRequestInput): Promise<TeamRequest>;
    deleteRequest(requestID: string): Promise<boolean>;
    updateLookUpRequestOrder(args: UpdateLookUpRequestOrderArgs): Promise<boolean>;
    moveRequest(args: MoveTeamRequestArgs): Promise<{
        id: string;
        collectionID: string;
        teamID: string;
        title: string;
        request: string;
    }>;
    teamRequestAdded(teamID: string): AsyncIterator<unknown, any, undefined>;
    teamRequestUpdated(teamID: string): AsyncIterator<unknown, any, undefined>;
    teamRequestDeleted(teamID: string): AsyncIterator<unknown, any, undefined>;
    requestOrderUpdated(teamID: string): AsyncIterator<unknown, any, undefined>;
    requestMoved(teamID: string): AsyncIterator<unknown, any, undefined>;
}
