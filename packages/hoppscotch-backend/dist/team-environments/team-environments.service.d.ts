import * as T from 'fp-ts/Task';
import * as TO from 'fp-ts/TaskOption';
import * as TE from 'fp-ts/TaskEither';
import { PrismaService } from 'src/prisma/prisma.service';
import { PubSubService } from 'src/pubsub/pubsub.service';
import { TeamEnvironment } from './team-environments.model';
export declare class TeamEnvironmentsService {
    private readonly prisma;
    private readonly pubsub;
    constructor(prisma: PrismaService, pubsub: PubSubService);
    getTeamEnvironment(id: string): TO.TaskOption<import("@prisma/client").TeamEnvironment>;
    createTeamEnvironment(name: string, teamID: string, variables: string): T.Task<TeamEnvironment>;
    deleteTeamEnvironment(id: string): TE.TaskEither<"team_environment/not_found", boolean>;
    updateTeamEnvironment(id: string, name: string, variables: string): TE.TaskEither<"team_environment/not_found", TeamEnvironment>;
    deleteAllVariablesFromTeamEnvironment(id: string): TE.TaskEither<"team_environment/not_found", TeamEnvironment>;
    createDuplicateEnvironment(id: string): TE.TaskEither<"team_environment/not_found", TeamEnvironment>;
    fetchAllTeamEnvironments(teamID: string): T.Task<TeamEnvironment[]>;
    totalEnvsInTeam(teamID: string): Promise<number>;
}
