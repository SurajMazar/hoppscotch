import { TeamMemberRole } from '../team/team.model';
export declare class TeamInvitation {
    id: string;
    teamID: string;
    creatorUid: string;
    inviteeEmail: string;
    inviteeRole: TeamMemberRole;
}
