import { UserService } from '../user/user.service';
import { PubSubService } from '../pubsub/pubsub.service';
import { PrismaService } from '../prisma/prisma.service';
import * as E from 'fp-ts/Either';
import { MailerService } from '../mailer/mailer.service';
import { InvitedUser } from './invited-user.model';
import { TeamService } from '../team/team.service';
import { TeamCollectionService } from '../team-collection/team-collection.service';
import { TeamRequestService } from '../team-request/team-request.service';
import { TeamEnvironmentsService } from '../team-environments/team-environments.service';
import { TeamInvitationService } from '../team-invitation/team-invitation.service';
import { TeamMemberRole } from '../team/team.model';
export declare class AdminService {
    private readonly userService;
    private readonly teamService;
    private readonly teamCollectionService;
    private readonly teamRequestService;
    private readonly teamEnvironmentsService;
    private readonly teamInvitationService;
    private readonly pubsub;
    private readonly prisma;
    private readonly mailerService;
    constructor(userService: UserService, teamService: TeamService, teamCollectionService: TeamCollectionService, teamRequestService: TeamRequestService, teamEnvironmentsService: TeamEnvironmentsService, teamInvitationService: TeamInvitationService, pubsub: PubSubService, prisma: PrismaService, mailerService: MailerService);
    fetchUsers(cursorID: string, take: number): Promise<import("@prisma/client").User[]>;
    inviteUserToSignInViaEmail(adminUID: string, adminEmail: string, inviteeEmail: string): Promise<E.Left<"invalid/email"> | E.Left<"email/failed"> | E.Left<"email/both_emails_cannot_be_same"> | E.Left<"admin/user_already_invited"> | E.Right<InvitedUser>>;
    fetchInvitedUsers(): Promise<InvitedUser[]>;
    fetchAllTeams(cursorID: string, take: number): Promise<import("@prisma/client").Team[]>;
    membersCountInTeam(teamID: string): Promise<number>;
    collectionCountInTeam(teamID: string): Promise<number>;
    requestCountInTeam(teamID: string): Promise<number>;
    environmentCountInTeam(teamID: string): Promise<number>;
    pendingInvitationCountInTeam(teamID: string): Promise<import("@prisma/client").TeamInvitation[]>;
    changeRoleOfUserTeam(userUid: string, teamID: string, newRole: TeamMemberRole): Promise<E.Left<string> | E.Right<import("../team/team.model").TeamMember>>;
    removeUserFromTeam(userUid: string, teamID: string): Promise<E.Left<string> | E.Right<boolean>>;
    addUserToTeam(teamID: string, userEmail: string, role: TeamMemberRole): Promise<E.Left<string> | E.Right<import("../team/team.model").TeamMember>>;
    createATeam(userUid: string, name: string): Promise<E.Left<string> | E.Right<import("../team/team.model").Team>>;
    renameATeam(teamID: string, newName: string): Promise<E.Left<string> | E.Right<import("../team/team.model").Team>>;
    deleteATeam(teamID: string): Promise<E.Left<string> | E.Right<boolean>>;
    fetchAdmins(): Promise<import("@prisma/client").User[]>;
    fetchUserInfo(userUid: string): Promise<E.Right<import("@prisma/client").User> | E.Left<"user/not_found">>;
    removeUserAccount(userUid: string): Promise<E.Left<string> | E.Right<boolean>>;
    makeUserAdmin(userUID: string): Promise<E.Left<"user/not_found"> | E.Right<boolean>>;
    removeUserAsAdmin(userUID: string): Promise<E.Left<"user/not_found"> | E.Right<boolean> | E.Left<"admin/only_one_admin_account_found">>;
    getUsersCount(): Promise<number>;
    getTeamsCount(): Promise<number>;
    getTeamCollectionsCount(): Promise<number>;
    getTeamRequestsCount(): Promise<number>;
    getTeamInfo(teamID: string): Promise<E.Left<"team/invalid_id"> | E.Right<import("../team/team.model").Team>>;
}
