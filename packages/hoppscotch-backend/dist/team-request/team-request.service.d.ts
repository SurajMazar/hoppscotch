import { TeamService } from '../team/team.service';
import { PrismaService } from '../prisma/prisma.service';
import { TeamRequest } from './team-request.model';
import { TeamCollectionService } from '../team-collection/team-collection.service';
import { PubSubService } from 'src/pubsub/pubsub.service';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { TeamRequest as DbTeamRequest } from '@prisma/client';
export declare class TeamRequestService {
    private readonly prisma;
    private readonly teamService;
    private readonly teamCollectionService;
    private readonly pubsub;
    constructor(prisma: PrismaService, teamService: TeamService, teamCollectionService: TeamCollectionService, pubsub: PubSubService);
    private cast;
    updateTeamRequest(requestID: string, title: string, request: string): Promise<E.Left<string> | E.Right<TeamRequest>>;
    searchRequest(teamID: string, searchTerm: string, cursor: string, take?: number): Promise<{
        id: string;
        collectionID: string;
        teamID: string;
        title: string;
        request: string;
    }[]>;
    deleteTeamRequest(requestID: string): Promise<E.Right<boolean> | E.Left<"team_req/not_found">>;
    createTeamRequest(collectionID: string, teamID: string, title: string, request: string): Promise<E.Left<string> | E.Right<{
        id: string;
        collectionID: string;
        teamID: string;
        title: string;
        request: string;
    }>>;
    getRequestsInCollection(collectionID: string, cursor: string, take?: number): Promise<{
        id: string;
        collectionID: string;
        teamID: string;
        title: string;
        request: string;
    }[]>;
    getRequest(reqID: string): Promise<O.None | O.Some<{
        id: string;
        collectionID: string;
        teamID: string;
        title: string;
        request: string;
    }>>;
    getTeamOfRequest(req: TeamRequest): Promise<E.Left<"team/invalid_id"> | E.Right<import("../team/team.model").Team>>;
    getCollectionOfRequest(req: TeamRequest): Promise<E.Right<import("@prisma/client").TeamCollection> | E.Left<"team/invalid_coll_id">>;
    getTeamOfRequestFromID(reqID: string): Promise<O.None | O.Some<import("@prisma/client").Team>>;
    moveRequest(srcCollID: string, requestID: string, destCollID: string, nextRequestID: string, callerFunction: 'moveRequest' | 'updateLookUpRequestOrder'): Promise<E.Left<string> | E.Right<{
        id: string;
        collectionID: string;
        teamID: string;
        title: string;
        request: string;
    }>>;
    findRequestAndNextRequest(srcCollID: string, requestID: string, destCollID: string, nextRequestID: string): Promise<E.Left<"team_req/not_found"> | E.Left<"team_req/invalid_target_id"> | E.Right<{
        request: DbTeamRequest;
        nextRequest: any;
    }>>;
    getRequestsCountInCollection(collectionID: string): Promise<number>;
    reorderRequests(request: DbTeamRequest, srcCollID: string, nextRequest: DbTeamRequest, destCollID: string): Promise<E.Left<string> | E.Right<DbTeamRequest>>;
    totalRequestsInATeam(teamID: string): Promise<number>;
    getTeamRequestsCount(): Promise<number>;
}
