import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TeamService } from 'src/team/team.service';
import { TeamInvitationService } from './team-invitation.service';
export declare class TeamInviteTeamOwnerGuard implements CanActivate {
    private readonly teamService;
    private readonly teamInviteService;
    constructor(teamService: TeamService, teamInviteService: TeamInvitationService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
