import { UserEnvironment } from './user-environments.model';
import { PrismaService } from '../prisma/prisma.service';
import { PubSubService } from '../pubsub/pubsub.service';
import * as E from 'fp-ts/Either';
export declare class UserEnvironmentsService {
    private readonly prisma;
    private readonly pubsub;
    constructor(prisma: PrismaService, pubsub: PubSubService);
    fetchUserEnvironments(uid: string): Promise<UserEnvironment[]>;
    fetchUserGlobalEnvironment(uid: string): Promise<E.Right<UserEnvironment> | E.Left<"user_environment/user_env_does_not_exists">>;
    createUserEnvironment(uid: string, name: string, variables: string, isGlobal: boolean): Promise<E.Left<string> | E.Right<UserEnvironment>>;
    updateUserEnvironment(id: string, name: string, variables: string): Promise<E.Left<string> | E.Right<UserEnvironment>>;
    deleteUserEnvironment(uid: string, id: string): Promise<E.Right<boolean> | E.Left<"user_environment/user_env_does_not_exists"> | E.Left<"user_environment/user_env_global_env_deletion_failed">>;
    deleteUserEnvironments(uid: string): Promise<number>;
    clearGlobalEnvironments(uid: string, id: string): Promise<E.Right<UserEnvironment> | E.Left<"user_environment/global_env_does_not_exists"> | E.Left<"user_environment/user_env_update_failed"> | E.Left<"user_environment/user_env_is_not_global">>;
    private checkForExistingGlobalEnv;
}
