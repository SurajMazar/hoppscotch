import { User } from 'src/user/user.model';
import { UserEnvironment } from './user-environments.model';
import { UserEnvironmentsService } from './user-environments.service';
export declare class UserEnvsUserResolver {
    private userEnvironmentsService;
    constructor(userEnvironmentsService: UserEnvironmentsService);
    environments(user: User): Promise<UserEnvironment[]>;
    globalEnvironments(user: User): Promise<UserEnvironment | string>;
}
