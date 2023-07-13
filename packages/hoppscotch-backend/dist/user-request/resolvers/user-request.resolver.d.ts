import { PubSubService } from 'src/pubsub/pubsub.service';
import { UserRequest } from '../user-request.model';
import { UserRequestService } from '../user-request.service';
import { GetUserRequestArgs, CreateUserRequestArgs, UpdateUserRequestArgs, MoveUserRequestArgs } from '../input-type.args';
import { AuthUser } from 'src/types/AuthUser';
export declare class UserRequestResolver {
    private readonly userRequestService;
    private readonly pubSub;
    constructor(userRequestService: UserRequestService, pubSub: PubSubService);
    user(user: AuthUser): Promise<import("@prisma/client").User>;
    userRESTRequests(user: AuthUser, args: GetUserRequestArgs): Promise<UserRequest[]>;
    userGQLRequests(user: AuthUser, args: GetUserRequestArgs): Promise<UserRequest[]>;
    userRequest(user: AuthUser, id: string): Promise<UserRequest>;
    createRESTUserRequest(user: AuthUser, args: CreateUserRequestArgs): Promise<UserRequest>;
    createGQLUserRequest(user: AuthUser, args: CreateUserRequestArgs): Promise<UserRequest>;
    updateRESTUserRequest(user: AuthUser, id: string, args: UpdateUserRequestArgs): Promise<UserRequest>;
    updateGQLUserRequest(user: AuthUser, id: string, args: UpdateUserRequestArgs): Promise<UserRequest>;
    deleteUserRequest(user: AuthUser, id: string): Promise<boolean>;
    moveUserRequest(user: AuthUser, args: MoveUserRequestArgs): Promise<UserRequest>;
    userRequestCreated(user: AuthUser): AsyncIterator<unknown, any, undefined>;
    userRequestUpdated(user: AuthUser): AsyncIterator<unknown, any, undefined>;
    userRequestDeleted(user: AuthUser): AsyncIterator<unknown, any, undefined>;
    userRequestMoved(user: AuthUser): AsyncIterator<unknown, any, undefined>;
}
