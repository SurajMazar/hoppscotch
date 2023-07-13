import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TeamEnvironmentsService } from './team-environments.service';
import { TeamService } from 'src/team/team.service';
export declare class GqlTeamEnvTeamGuard implements CanActivate {
    private readonly reflector;
    private readonly teamEnvironmentService;
    private readonly teamService;
    constructor(reflector: Reflector, teamEnvironmentService: TeamEnvironmentsService, teamService: TeamService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
