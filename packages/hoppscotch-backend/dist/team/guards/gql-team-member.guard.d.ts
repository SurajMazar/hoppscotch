import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TeamService } from '../team.service';
export declare class GqlTeamMemberGuard implements CanActivate {
    private readonly reflector;
    private readonly teamService;
    constructor(reflector: Reflector, teamService: TeamService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
