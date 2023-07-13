import * as T from 'fp-ts/Task';
import * as TO from 'fp-ts/TaskOption';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import { PrismaService } from 'src/prisma/prisma.service';
import { Team, TeamMemberRole } from 'src/team/team.model';
import { Email } from 'src/types/Email';
import { User } from 'src/user/user.model';
import { TeamService } from 'src/team/team.service';
import { TeamInvitation } from './team-invitation.model';
import { MailerService } from 'src/mailer/mailer.service';
import { UserService } from 'src/user/user.service';
import { PubSubService } from 'src/pubsub/pubsub.service';
export declare class TeamInvitationService {
    private readonly prisma;
    private readonly userService;
    private readonly teamService;
    private readonly mailerService;
    private readonly pubsub;
    constructor(prisma: PrismaService, userService: UserService, teamService: TeamService, mailerService: MailerService, pubsub: PubSubService);
    getInvitation(inviteID: string): TO.TaskOption<TeamInvitation>;
    getInvitationWithEmail(email: Email, team: Team): TO.TaskOption<import("@prisma/client").TeamInvitation>;
    getTeamInviteByEmailAndTeamID(inviteeEmail: string, teamID: string): Promise<E.Left<"invalid/email"> | E.Right<import("@prisma/client").TeamInvitation> | E.Left<"team_invite/no_invite_found">>;
    createInvitation(creator: User, team: Team, inviteeEmail: Email, inviteeRole: TeamMemberRole): TE.TaskEither<"team/member_not_found" | "team_invite/member_has_invite" | "team_invite/already_member", TeamInvitation>;
    revokeInvitation(inviteID: string): TE.TaskEither<"team_invite/no_invite_found", void>;
    getAllInvitationsInTeam(team: Team): T.Task<TeamInvitation[]>;
    acceptInvitation(inviteID: string, acceptedBy: User): TE.TaskEither<"team_invite/no_invite_found" | "team_invite/already_member" | "team_invite/email_do_not_match", import("src/team/team.model").TeamMember>;
    getAllTeamInvitations(teamID: string): Promise<import("@prisma/client").TeamInvitation[]>;
}
