import { SessionType, User } from './user.model';
import { UserService } from './user.service';
import { PubSubService } from 'src/pubsub/pubsub.service';
import { AuthUser } from 'src/types/AuthUser';
export declare class UserResolver {
    private readonly userService;
    private readonly pubsub;
    constructor(userService: UserService, pubsub: PubSubService);
    me(user: AuthUser): User;
    updateUserSessions(user: AuthUser, currentSession: string, sessionType: SessionType): Promise<User>;
    deleteUser(user: AuthUser): Promise<boolean>;
    userUpdated(user: User): AsyncIterator<unknown, any, undefined>;
    userDeleted(user: User): AsyncIterator<User>;
}
