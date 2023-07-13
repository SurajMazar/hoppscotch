import { UserRequestService } from '../user-request.service';
import { UserRequest } from '../user-request.model';
import { AuthUser } from 'src/types/AuthUser';
import { UserCollection } from 'src/user-collection/user-collections.model';
import { PaginationArgs } from 'src/types/input-types.args';
export declare class UserRequestUserCollectionResolver {
    private readonly userRequestService;
    constructor(userRequestService: UserRequestService);
    requests(user: AuthUser, collection: UserCollection, args: PaginationArgs): Promise<UserRequest[]>;
}
