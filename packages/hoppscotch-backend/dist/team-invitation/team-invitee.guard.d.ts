import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TeamInvitationService } from './team-invitation.service';
export declare class TeamInviteeGuard implements CanActivate {
    private readonly teamInviteService;
    constructor(teamInviteService: TeamInvitationService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
