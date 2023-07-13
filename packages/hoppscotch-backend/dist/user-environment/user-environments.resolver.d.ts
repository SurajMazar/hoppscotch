import { PubSubService } from '../pubsub/pubsub.service';
import { UserEnvironment } from './user-environments.model';
import { User } from '../user/user.model';
import { UserEnvironmentsService } from './user-environments.service';
export declare class UserEnvironmentsResolver {
    private readonly userEnvironmentsService;
    private readonly pubsub;
    constructor(userEnvironmentsService: UserEnvironmentsService, pubsub: PubSubService);
    createUserEnvironment(user: User, name: string, variables: string): Promise<UserEnvironment>;
    createUserGlobalEnvironment(user: User, variables: string): Promise<UserEnvironment>;
    updateUserEnvironment(id: string, name: string, variables: string): Promise<UserEnvironment>;
    deleteUserEnvironment(user: User, id: string): Promise<boolean>;
    deleteUserEnvironments(user: User): Promise<number>;
    clearGlobalEnvironments(user: User, id: string): Promise<UserEnvironment>;
    userEnvironmentCreated(user: User): AsyncIterator<unknown, any, undefined>;
    userEnvironmentUpdated(user: User): AsyncIterator<unknown, any, undefined>;
    userEnvironmentDeleted(user: User): AsyncIterator<unknown, any, undefined>;
    userEnvironmentDeleteMany(user: User): AsyncIterator<unknown, any, undefined>;
}
