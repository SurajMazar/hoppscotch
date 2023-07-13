import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TeamCollectionService } from '../team-collection.service';
import { TeamService } from '../../team/team.service';
export declare class GqlCollectionTeamMemberGuard implements CanActivate {
    private readonly reflector;
    private readonly teamService;
    private readonly teamCollectionService;
    constructor(reflector: Reflector, teamService: TeamService, teamCollectionService: TeamCollectionService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
