"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const prisma_service_1 = require("../prisma/prisma.service");
const E = require("fp-ts/Either");
const O = require("fp-ts/Option");
const utils_1 = require("../utils");
const errors_1 = require("../errors");
const mailer_service_1 = require("../mailer/mailer.service");
const team_service_1 = require("../team/team.service");
const team_collection_service_1 = require("../team-collection/team-collection.service");
const team_request_service_1 = require("../team-request/team-request.service");
const team_environments_service_1 = require("../team-environments/team-environments.service");
const team_invitation_service_1 = require("../team-invitation/team-invitation.service");
let AdminService = class AdminService {
    constructor(userService, teamService, teamCollectionService, teamRequestService, teamEnvironmentsService, teamInvitationService, pubsub, prisma, mailerService) {
        this.userService = userService;
        this.teamService = teamService;
        this.teamCollectionService = teamCollectionService;
        this.teamRequestService = teamRequestService;
        this.teamEnvironmentsService = teamEnvironmentsService;
        this.teamInvitationService = teamInvitationService;
        this.pubsub = pubsub;
        this.prisma = prisma;
        this.mailerService = mailerService;
    }
    async fetchUsers(cursorID, take) {
        const allUsers = await this.userService.fetchAllUsers(cursorID, take);
        return allUsers;
    }
    async inviteUserToSignInViaEmail(adminUID, adminEmail, inviteeEmail) {
        if (inviteeEmail == adminEmail)
            return E.left(errors_1.DUPLICATE_EMAIL);
        if (!(0, utils_1.validateEmail)(inviteeEmail))
            return E.left(errors_1.INVALID_EMAIL);
        const alreadyInvitedUser = await this.prisma.invitedUsers.findFirst({
            where: {
                inviteeEmail: inviteeEmail,
            },
        });
        if (alreadyInvitedUser != null)
            return E.left(errors_1.USER_ALREADY_INVITED);
        try {
            await this.mailerService.sendUserInvitationEmail(inviteeEmail, {
                template: 'code-your-own',
                variables: {
                    inviteeEmail: inviteeEmail,
                    magicLink: `${process.env.VITE_BASE_URL}`,
                },
            });
        }
        catch (e) {
            return E.left(errors_1.EMAIL_FAILED);
        }
        const dbInvitedUser = await this.prisma.invitedUsers.create({
            data: {
                adminUid: adminUID,
                adminEmail: adminEmail,
                inviteeEmail: inviteeEmail,
            },
        });
        const invitedUser = {
            adminEmail: dbInvitedUser.adminEmail,
            adminUid: dbInvitedUser.adminUid,
            inviteeEmail: dbInvitedUser.inviteeEmail,
            invitedOn: dbInvitedUser.invitedOn,
        };
        await this.pubsub.publish(`admin/${adminUID}/invited`, invitedUser);
        return E.right(invitedUser);
    }
    async fetchInvitedUsers() {
        const invitedUsers = await this.prisma.invitedUsers.findMany();
        const users = invitedUsers.map((user) => (Object.assign({}, user)));
        return users;
    }
    async fetchAllTeams(cursorID, take) {
        const allTeams = await this.teamService.fetchAllTeams(cursorID, take);
        return allTeams;
    }
    async membersCountInTeam(teamID) {
        const teamMembersCount = await this.teamService.getCountOfMembersInTeam(teamID);
        return teamMembersCount;
    }
    async collectionCountInTeam(teamID) {
        const teamCollectionsCount = await this.teamCollectionService.totalCollectionsInTeam(teamID);
        return teamCollectionsCount;
    }
    async requestCountInTeam(teamID) {
        const teamRequestsCount = await this.teamRequestService.totalRequestsInATeam(teamID);
        return teamRequestsCount;
    }
    async environmentCountInTeam(teamID) {
        const envCount = await this.teamEnvironmentsService.totalEnvsInTeam(teamID);
        return envCount;
    }
    async pendingInvitationCountInTeam(teamID) {
        const invitations = await this.teamInvitationService.getAllTeamInvitations(teamID);
        return invitations;
    }
    async changeRoleOfUserTeam(userUid, teamID, newRole) {
        const updatedTeamMember = await this.teamService.updateTeamMemberRole(teamID, userUid, newRole);
        if (E.isLeft(updatedTeamMember))
            return E.left(updatedTeamMember.left);
        return E.right(updatedTeamMember.right);
    }
    async removeUserFromTeam(userUid, teamID) {
        const removedUser = await this.teamService.leaveTeam(teamID, userUid);
        if (E.isLeft(removedUser))
            return E.left(removedUser.left);
        return E.right(removedUser.right);
    }
    async addUserToTeam(teamID, userEmail, role) {
        if (!(0, utils_1.validateEmail)(userEmail))
            return E.left(errors_1.INVALID_EMAIL);
        const user = await this.userService.findUserByEmail(userEmail);
        if (O.isNone(user))
            return E.left(errors_1.USER_NOT_FOUND);
        const teamMember = await this.teamService.getTeamMemberTE(teamID, user.value.uid)();
        if (E.isLeft(teamMember)) {
            const addedUser = await this.teamService.addMemberToTeamWithEmail(teamID, userEmail, role);
            if (E.isLeft(addedUser))
                return E.left(addedUser.left);
            const userInvitation = await this.teamInvitationService.getTeamInviteByEmailAndTeamID(userEmail, teamID);
            if (E.isRight(userInvitation)) {
                await this.teamInvitationService.revokeInvitation(userInvitation.right.id)();
            }
            return E.right(addedUser.right);
        }
        return E.left(errors_1.TEAM_INVITE_ALREADY_MEMBER);
    }
    async createATeam(userUid, name) {
        const validUser = await this.userService.findUserById(userUid);
        if (O.isNone(validUser))
            return E.left(errors_1.USER_NOT_FOUND);
        const createdTeam = await this.teamService.createTeam(name, userUid);
        if (E.isLeft(createdTeam))
            return E.left(createdTeam.left);
        return E.right(createdTeam.right);
    }
    async renameATeam(teamID, newName) {
        const renamedTeam = await this.teamService.renameTeam(teamID, newName);
        if (E.isLeft(renamedTeam))
            return E.left(renamedTeam.left);
        return E.right(renamedTeam.right);
    }
    async deleteATeam(teamID) {
        const deleteTeam = await this.teamService.deleteTeam(teamID);
        if (E.isLeft(deleteTeam))
            return E.left(deleteTeam.left);
        return E.right(deleteTeam.right);
    }
    async fetchAdmins() {
        const admins = this.userService.fetchAdminUsers();
        return admins;
    }
    async fetchUserInfo(userUid) {
        const user = await this.userService.findUserById(userUid);
        if (O.isNone(user))
            return E.left(errors_1.USER_NOT_FOUND);
        return E.right(user.value);
    }
    async removeUserAccount(userUid) {
        const user = await this.userService.findUserById(userUid);
        if (O.isNone(user))
            return E.left(errors_1.USER_NOT_FOUND);
        if (user.value.isAdmin)
            return E.left(errors_1.USER_IS_ADMIN);
        const delUser = await this.userService.deleteUserByUID(user.value)();
        if (E.isLeft(delUser))
            return E.left(delUser.left);
        return E.right(delUser.right);
    }
    async makeUserAdmin(userUID) {
        const admin = await this.userService.makeAdmin(userUID);
        if (E.isLeft(admin))
            return E.left(admin.left);
        return E.right(true);
    }
    async removeUserAsAdmin(userUID) {
        const adminUsers = await this.userService.fetchAdminUsers();
        if (adminUsers.length === 1)
            return E.left(errors_1.ONLY_ONE_ADMIN_ACCOUNT);
        const admin = await this.userService.removeUserAsAdmin(userUID);
        if (E.isLeft(admin))
            return E.left(admin.left);
        return E.right(true);
    }
    async getUsersCount() {
        const usersCount = this.userService.getUsersCount();
        return usersCount;
    }
    async getTeamsCount() {
        const teamsCount = this.teamService.getTeamsCount();
        return teamsCount;
    }
    async getTeamCollectionsCount() {
        const teamCollectionCount = this.teamCollectionService.getTeamCollectionsCount();
        return teamCollectionCount;
    }
    async getTeamRequestsCount() {
        const teamRequestCount = this.teamRequestService.getTeamRequestsCount();
        return teamRequestCount;
    }
    async getTeamInfo(teamID) {
        const team = await this.teamService.getTeamWithIDTE(teamID)();
        if (E.isLeft(team))
            return E.left(team.left);
        return E.right(team.right);
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        team_service_1.TeamService,
        team_collection_service_1.TeamCollectionService,
        team_request_service_1.TeamRequestService,
        team_environments_service_1.TeamEnvironmentsService,
        team_invitation_service_1.TeamInvitationService,
        pubsub_service_1.PubSubService,
        prisma_service_1.PrismaService,
        mailer_service_1.MailerService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map