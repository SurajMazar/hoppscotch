import { User } from '../user/user.model';
import { UserHistoryService } from './user-history.service';
import { UserHistory } from './user-history.model';
import { PaginationArgs } from '../types/input-types.args';
export declare class UserHistoryUserResolver {
    private userHistoryService;
    constructor(userHistoryService: UserHistoryService);
    RESTHistory(user: User, args: PaginationArgs): Promise<UserHistory[]>;
    GQLHistory(user: User, args: PaginationArgs): Promise<UserHistory[]>;
}
