import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TeamInvitationService } from './team-invitation.service';
import { TeamService } from 'src/team/team.service';
export declare class TeamInviteViewerGuard implements CanActivate {
    private readonly teamInviteService;
    private readonly teamService;
    constructor(teamInviteService: TeamInvitationService, teamService: TeamService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
