import { UserHistoryService } from './user-history.service';
import { PubSubService } from '../pubsub/pubsub.service';
import { UserHistory, UserHistoryDeletedManyData } from './user-history.model';
import { ReqType } from 'src/types/RequestTypes';
import { User } from '../user/user.model';
export declare class UserHistoryResolver {
    private readonly userHistoryService;
    private readonly pubsub;
    constructor(userHistoryService: UserHistoryService, pubsub: PubSubService);
    createUserHistory(user: User, reqData: string, resMetadata: string, reqType: ReqType): Promise<UserHistory>;
    toggleHistoryStarStatus(user: User, id: string): Promise<UserHistory>;
    removeRequestFromHistory(user: User, id: string): Promise<UserHistory>;
    deleteAllUserHistory(user: User, reqType: ReqType): Promise<UserHistoryDeletedManyData>;
    userHistoryCreated(user: User): AsyncIterator<unknown, any, undefined>;
    userHistoryUpdated(user: User): AsyncIterator<unknown, any, undefined>;
    userHistoryDeleted(user: User): AsyncIterator<unknown, any, undefined>;
    userHistoryDeletedMany(user: User): AsyncIterator<unknown, any, undefined>;
}
