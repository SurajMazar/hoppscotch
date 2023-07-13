import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TeamRequestService } from '../team-request.service';
import { TeamService } from '../../team/team.service';
import { Reflector } from '@nestjs/core';
export declare class GqlRequestTeamMemberGuard implements CanActivate {
    private readonly reflector;
    private readonly teamRequestService;
    private readonly teamService;
    constructor(reflector: Reflector, teamRequestService: TeamRequestService, teamService: TeamService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
