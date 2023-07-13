import { TeamInvitation } from './team-invitation.model';
import { TeamInvitationService } from './team-invitation.service';
import { Team, TeamMember, TeamMemberRole } from 'src/team/team.model';
import { User } from 'src/user/user.model';
import { TeamService } from 'src/team/team.service';
import { UserService } from 'src/user/user.service';
import { PubSubService } from 'src/pubsub/pubsub.service';
export declare class TeamInvitationResolver {
    private readonly userService;
    private readonly teamService;
    private readonly teamInvitationService;
    private readonly pubsub;
    constructor(userService: UserService, teamService: TeamService, teamInvitationService: TeamInvitationService, pubsub: PubSubService);
    team(teamInvitation: TeamInvitation): Promise<Team>;
    creator(teamInvitation: TeamInvitation): Promise<User>;
    teamInvitation(user: User, inviteID: string): Promise<TeamInvitation>;
    createTeamInvitation(user: User, teamID: string, inviteeEmail: string, inviteeRole: TeamMemberRole): Promise<TeamInvitation>;
    revokeTeamInvitation(inviteID: string): Promise<true>;
    acceptTeamInvitation(user: User, inviteID: string): Promise<TeamMember>;
    teamInvitationAdded(teamID: string): AsyncIterator<TeamInvitation>;
    teamInvitationRemoved(teamID: string): AsyncIterator<string>;
}
