import { Team } from 'src/team/team.model';
import { TeamEnvironment } from './team-environments.model';
import { TeamEnvironmentsService } from './team-environments.service';
export declare class TeamEnvsTeamResolver {
    private teamEnvironmentService;
    constructor(teamEnvironmentService: TeamEnvironmentsService);
    teamEnvironments(team: Team): Promise<TeamEnvironment[]>;
}
