import { Team } from 'src/team/team.model';
import { TeamInvitation } from './team-invitation.model';
import { TeamInvitationService } from './team-invitation.service';
export declare class TeamTeamInviteExtResolver {
    private readonly teamInviteService;
    constructor(teamInviteService: TeamInvitationService);
    teamInvitations(team: Team): Promise<TeamInvitation[]>;
}
