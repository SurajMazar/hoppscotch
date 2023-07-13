import { PrismaService } from '../prisma/prisma.service';
import { PubSubService } from '../pubsub/pubsub.service';
import * as E from 'fp-ts/Either';
import { UserRequest } from './user-request.model';
import { UserRequest as DbUserRequest } from '@prisma/client';
import { AuthUser } from 'src/types/AuthUser';
import { ReqType } from 'src/types/RequestTypes';
import { UserCollectionService } from 'src/user-collection/user-collection.service';
export declare class UserRequestService {
    private readonly prisma;
    private readonly pubsub;
    private readonly userCollectionService;
    constructor(prisma: PrismaService, pubsub: PubSubService, userCollectionService: UserCollectionService);
    private cast;
    fetchUserRequests(collectionID: string, type: ReqType, cursor: string, take: number, user: AuthUser): Promise<E.Either<never, UserRequest[]>>;
    fetchUserRequest(id: string, user: AuthUser): Promise<E.Left<string> | E.Right<UserRequest>>;
    getRequestsCountInCollection(collectionID: string): Promise<number>;
    createRequest(collectionID: string, title: string, request: string, type: ReqType, user: AuthUser): Promise<E.Left<string> | E.Right<UserRequest>>;
    updateRequest(id: string, title: string, type: ReqType, request: string, user: AuthUser): Promise<E.Left<string> | E.Right<UserRequest>>;
    deleteRequest(id: string, user: AuthUser): Promise<E.Left<string> | E.Right<boolean>>;
    moveRequest(srcCollID: string, destCollID: string, requestID: string, nextRequestID: string, user: AuthUser): Promise<E.Left<string> | E.Right<UserRequest>>;
    validateTypeEqualityForMoveRequest(srcCollID: any, destCollID: any, request: any, nextRequest: any): Promise<E.Right<boolean> | E.Left<"user_coll/not_found"> | E.Left<"user_request/type_mismatch">>;
    findRequestAndNextRequest(srcCollID: string, destCollID: string, requestID: string, nextRequestID: string, user: AuthUser): Promise<E.Left<string> | E.Right<{
        request: DbUserRequest;
        nextRequest: DbUserRequest;
    }>>;
    reorderRequests(srcCollID: string, request: DbUserRequest, destCollID: string, nextRequest: DbUserRequest): Promise<E.Left<string> | E.Right<DbUserRequest>>;
}
