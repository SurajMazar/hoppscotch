import { PubSubService } from 'src/pubsub/pubsub.service';
import { TeamEnvironment } from './team-environments.model';
import { TeamEnvironmentsService } from './team-environments.service';
export declare class TeamEnvironmentsResolver {
    private readonly teamEnvironmentsService;
    private readonly pubsub;
    constructor(teamEnvironmentsService: TeamEnvironmentsService, pubsub: PubSubService);
    createTeamEnvironment(name: string, teamID: string, variables: string): Promise<TeamEnvironment>;
    deleteTeamEnvironment(id: string): Promise<boolean>;
    updateTeamEnvironment(id: string, name: string, variables: string): Promise<TeamEnvironment>;
    deleteAllVariablesFromTeamEnvironment(id: string): Promise<TeamEnvironment>;
    createDuplicateEnvironment(id: string): Promise<TeamEnvironment>;
    teamEnvironmentUpdated(teamID: string): AsyncIterator<unknown, any, undefined>;
    teamEnvironmentCreated(teamID: string): AsyncIterator<unknown, any, undefined>;
    teamEnvironmentDeleted(teamID: string): AsyncIterator<unknown, any, undefined>;
}
