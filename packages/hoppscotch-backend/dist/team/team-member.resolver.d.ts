import { TeamMember } from './team.model';
import { UserService } from 'src/user/user.service';
import { User } from '../user/user.model';
export declare class TeamMemberResolver {
    private readonly userService;
    constructor(userService: UserService);
    user(teamMember: TeamMember): Promise<User>;
}
