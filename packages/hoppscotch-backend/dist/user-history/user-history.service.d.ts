import { PrismaService } from '../prisma/prisma.service';
import { PubSubService } from '../pubsub/pubsub.service';
import { UserHistory } from './user-history.model';
import { ReqType } from 'src/types/RequestTypes';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
export declare class UserHistoryService {
    private readonly prisma;
    private readonly pubsub;
    constructor(prisma: PrismaService, pubsub: PubSubService);
    fetchUserHistory(uid: string, take: number, reqType: ReqType): Promise<UserHistory[]>;
    createUserHistory(uid: string, reqData: string, resMetadata: string, reqType: string): Promise<E.Left<"user_history/req_type_invalid"> | E.Right<UserHistory>>;
    toggleHistoryStarStatus(uid: string, id: string): Promise<E.Right<UserHistory> | E.Left<"user_history/history_not_found">>;
    removeRequestFromHistory(uid: string, id: string): Promise<E.Right<UserHistory> | E.Left<"user_history/history_not_found">>;
    deleteAllUserHistory(uid: string, reqType: string): Promise<E.Left<"user_history/req_type_invalid"> | E.Right<{
        count: number;
        reqType: ReqType;
    }>>;
    fetchUserHistoryByID(id: string): Promise<O.None | O.Some<import("@prisma/client").UserHistory>>;
    validateReqType(reqType: string): E.Right<ReqType> | E.Left<"user_history/req_type_invalid">;
}
