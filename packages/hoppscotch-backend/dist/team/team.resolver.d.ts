import { Team, TeamMember, TeamMemberRole } from './team.model';
import { TeamService } from './team.service';
import { PubSubService } from '../pubsub/pubsub.service';
import { AuthUser } from 'src/types/AuthUser';
export declare class TeamResolver {
    private readonly teamService;
    private readonly pubsub;
    constructor(teamService: TeamService, pubsub: PubSubService);
    members(team: Team, cursor?: string): Promise<TeamMember[]>;
    teamMembers(team: Team): Promise<TeamMember[]>;
    myRole(team: Team, user: AuthUser): Promise<TeamMemberRole | null>;
    ownersCount(team: Team): Promise<number>;
    editorsCount(team: Team): Promise<number>;
    viewersCount(team: Team): Promise<number>;
    myTeams(user: AuthUser, cursor?: string): Promise<Team[]>;
    team(teamID: string): Promise<Team | null>;
    createTeam(user: AuthUser, name: string): Promise<Team>;
    leaveTeam(user: AuthUser, teamID: string): Promise<boolean>;
    removeTeamMember(_user: AuthUser, teamID: string, userUid: string): Promise<boolean>;
    renameTeam(teamID: string, newName: string): Promise<Team>;
    deleteTeam(teamID: string): Promise<boolean>;
    updateTeamMemberRole(teamID: string, userUid: string, newRole: TeamMemberRole): Promise<TeamMember>;
    teamMemberAdded(teamID: string): AsyncIterator<TeamMember>;
    teamMemberUpdated(teamID: string): AsyncIterator<TeamMember>;
    teamMemberRemoved(teamID: string): AsyncIterator<string>;
}
