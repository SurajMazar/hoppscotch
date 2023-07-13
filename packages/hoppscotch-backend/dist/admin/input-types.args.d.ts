import { TeamMemberRole } from '../team/team.model';
export declare class ChangeUserRoleInTeamArgs {
    userUID: string;
    teamID: string;
    newRole: TeamMemberRole;
}
export declare class AddUserToTeamArgs {
    teamID: string;
    role: TeamMemberRole;
    userEmail: string;
}
