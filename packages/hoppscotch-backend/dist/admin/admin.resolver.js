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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const admin_model_1 = require("./admin.model");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../guards/gql-auth.guard");
const gql_admin_guard_1 = require("./guards/gql-admin.guard");
const gql_admin_decorator_1 = require("./decorators/gql-admin.decorator");
const admin_service_1 = require("./admin.service");
const E = require("fp-ts/Either");
const utils_1 = require("../utils");
const invited_user_model_1 = require("./invited-user.model");
const gql_user_decorator_1 = require("../decorators/gql-user.decorator");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const team_model_1 = require("../team/team.model");
const user_model_1 = require("../user/user.model");
const team_invitation_model_1 = require("../team-invitation/team-invitation.model");
const input_types_args_1 = require("../types/input-types.args");
const input_types_args_2 = require("./input-types.args");
const gql_throttler_guard_1 = require("../guards/gql-throttler.guard");
const throttler_1 = require("@nestjs/throttler");
let AdminResolver = class AdminResolver {
    constructor(adminService, pubsub) {
        this.adminService = adminService;
        this.pubsub = pubsub;
    }
    admin(admin) {
        return admin;
    }
    async admins() {
        const admins = await this.adminService.fetchAdmins();
        return admins;
    }
    async userInfo(userUid) {
        const user = await this.adminService.fetchUserInfo(userUid);
        if (E.isLeft(user))
            (0, utils_1.throwErr)(user.left);
        return user.right;
    }
    async allUsers(admin, args) {
        const users = await this.adminService.fetchUsers(args.cursor, args.take);
        return users;
    }
    async invitedUsers(admin) {
        const users = await this.adminService.fetchInvitedUsers();
        return users;
    }
    async allTeams(admin, args) {
        const teams = await this.adminService.fetchAllTeams(args.cursor, args.take);
        return teams;
    }
    async teamInfo(admin, teamID) {
        const team = await this.adminService.getTeamInfo(teamID);
        if (E.isLeft(team))
            (0, utils_1.throwErr)(team.left);
        return team.right;
    }
    async membersCountInTeam(admin, teamID) {
        const teamMembersCount = await this.adminService.membersCountInTeam(teamID);
        return teamMembersCount;
    }
    async collectionCountInTeam(admin, teamID) {
        const teamCollCount = await this.adminService.collectionCountInTeam(teamID);
        return teamCollCount;
    }
    async requestCountInTeam(admin, teamID) {
        const teamReqCount = await this.adminService.requestCountInTeam(teamID);
        return teamReqCount;
    }
    async environmentCountInTeam(admin, teamID) {
        const envsCount = await this.adminService.environmentCountInTeam(teamID);
        return envsCount;
    }
    async pendingInvitationCountInTeam(admin, teamID) {
        const invitations = await this.adminService.pendingInvitationCountInTeam(teamID);
        return invitations;
    }
    async usersCount() {
        return this.adminService.getUsersCount();
    }
    async teamsCount() {
        return this.adminService.getTeamsCount();
    }
    async teamCollectionsCount() {
        return this.adminService.getTeamCollectionsCount();
    }
    async teamRequestsCount() {
        return this.adminService.getTeamRequestsCount();
    }
    async inviteNewUser(adminUser, inviteeEmail) {
        const invitedUser = await this.adminService.inviteUserToSignInViaEmail(adminUser.uid, adminUser.email, inviteeEmail);
        if (E.isLeft(invitedUser))
            (0, utils_1.throwErr)(invitedUser.left);
        return invitedUser.right;
    }
    async removeUserByAdmin(userUID) {
        const invitedUser = await this.adminService.removeUserAccount(userUID);
        if (E.isLeft(invitedUser))
            (0, utils_1.throwErr)(invitedUser.left);
        return invitedUser.right;
    }
    async makeUserAdmin(userUID) {
        const admin = await this.adminService.makeUserAdmin(userUID);
        if (E.isLeft(admin))
            (0, utils_1.throwErr)(admin.left);
        return admin.right;
    }
    async removeUserAsAdmin(userUID) {
        const admin = await this.adminService.removeUserAsAdmin(userUID);
        if (E.isLeft(admin))
            (0, utils_1.throwErr)(admin.left);
        return admin.right;
    }
    async createTeamByAdmin(adminUser, userUid, name) {
        const createdTeam = await this.adminService.createATeam(userUid, name);
        if (E.isLeft(createdTeam))
            (0, utils_1.throwErr)(createdTeam.left);
        return createdTeam.right;
    }
    async changeUserRoleInTeamByAdmin(adminUser, args) {
        const updatedRole = await this.adminService.changeRoleOfUserTeam(args.userUID, args.teamID, args.newRole);
        if (E.isLeft(updatedRole))
            (0, utils_1.throwErr)(updatedRole.left);
        return updatedRole.right;
    }
    async removeUserFromTeamByAdmin(adminUser, userUid, teamID) {
        const removedUser = await this.adminService.removeUserFromTeam(userUid, teamID);
        if (E.isLeft(removedUser))
            (0, utils_1.throwErr)(removedUser.left);
        return removedUser.right;
    }
    async addUserToTeamByAdmin(adminUser, args) {
        const addedUser = await this.adminService.addUserToTeam(args.teamID, args.userEmail, args.role);
        if (E.isLeft(addedUser))
            (0, utils_1.throwErr)(addedUser.left);
        return addedUser.right;
    }
    async renameTeamByAdmin(adminUser, teamID, newName) {
        const renamedTeam = await this.adminService.renameATeam(teamID, newName);
        if (E.isLeft(renamedTeam))
            (0, utils_1.throwErr)(renamedTeam.left);
        return renamedTeam.right;
    }
    async deleteTeamByAdmin(teamID) {
        const deletedTeam = await this.adminService.deleteATeam(teamID);
        if (E.isLeft(deletedTeam))
            (0, utils_1.throwErr)(deletedTeam.left);
        return deletedTeam.right;
    }
    userInvited(admin) {
        return this.pubsub.asyncIterator(`admin/${admin.uid}/invited`);
    }
};
__decorate([
    (0, graphql_1.Query)(() => admin_model_1.Admin, {
        description: 'Gives details of the admin executing this query',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_admin_guard_1.GqlAdminGuard),
    __param(0, (0, gql_admin_decorator_1.GqlAdmin)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_model_1.Admin]),
    __metadata("design:returntype", void 0)
], AdminResolver.prototype, "admin", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [user_model_1.User], {
        description: 'Returns a list of all admin users in infra',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_admin_guard_1.GqlAdminGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "admins", null);
__decorate([
    (0, graphql_1.ResolveField)(() => user_model_1.User, {
        description: 'Returns a user info by UID',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_admin_guard_1.GqlAdminGuard),
    __param(0, (0, graphql_1.Args)({
        name: 'userUid',
        type: () => graphql_1.ID,
        description: 'The user UID',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "userInfo", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [user_model_1.User], {
        description: 'Returns a list of all the users in infra',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_admin_guard_1.GqlAdminGuard),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_model_1.Admin,
        input_types_args_1.PaginationArgs]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "allUsers", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [invited_user_model_1.InvitedUser], {
        description: 'Returns a list of all the invited users',
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_model_1.Admin]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "invitedUsers", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [team_model_1.Team], {
        description: 'Returns a list of all the teams in the infra',
    }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_model_1.Admin,
        input_types_args_1.PaginationArgs]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "allTeams", null);
__decorate([
    (0, graphql_1.ResolveField)(() => team_model_1.Team, {
        description: 'Returns a team info by ID when requested by Admin',
    }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Args)({
        name: 'teamID',
        type: () => graphql_1.ID,
        description: 'Team ID for which info to fetch',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_model_1.Admin, String]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "teamInfo", null);
__decorate([
    (0, graphql_1.ResolveField)(() => Number, {
        description: 'Return count of all the members in a team',
    }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Args)({
        name: 'teamID',
        type: () => graphql_1.ID,
        description: 'Team ID for which team members to fetch',
        nullable: false,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_model_1.Admin, String]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "membersCountInTeam", null);
__decorate([
    (0, graphql_1.ResolveField)(() => Number, {
        description: 'Return count of all the stored collections in a team',
    }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Args)({
        name: 'teamID',
        type: () => graphql_1.ID,
        description: 'Team ID for which team members to fetch',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_model_1.Admin, String]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "collectionCountInTeam", null);
__decorate([
    (0, graphql_1.ResolveField)(() => Number, {
        description: 'Return count of all the stored requests in a team',
    }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Args)({
        name: 'teamID',
        type: () => graphql_1.ID,
        description: 'Team ID for which team members to fetch',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_model_1.Admin, String]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "requestCountInTeam", null);
__decorate([
    (0, graphql_1.ResolveField)(() => Number, {
        description: 'Return count of all the stored environments in a team',
    }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Args)({
        name: 'teamID',
        type: () => graphql_1.ID,
        description: 'Team ID for which team members to fetch',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_model_1.Admin, String]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "environmentCountInTeam", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [team_invitation_model_1.TeamInvitation], {
        description: 'Return all the pending invitations in a team',
    }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Args)({
        name: 'teamID',
        type: () => graphql_1.ID,
        description: 'Team ID for which team members to fetch',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_model_1.Admin, String]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "pendingInvitationCountInTeam", null);
__decorate([
    (0, graphql_1.ResolveField)(() => Number, {
        description: 'Return total number of Users in organization',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "usersCount", null);
__decorate([
    (0, graphql_1.ResolveField)(() => Number, {
        description: 'Return total number of Teams in organization',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "teamsCount", null);
__decorate([
    (0, graphql_1.ResolveField)(() => Number, {
        description: 'Return total number of Team Collections in organization',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "teamCollectionsCount", null);
__decorate([
    (0, graphql_1.ResolveField)(() => Number, {
        description: 'Return total number of Team Requests in organization',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "teamRequestsCount", null);
__decorate([
    (0, graphql_1.Mutation)(() => invited_user_model_1.InvitedUser, {
        description: 'Invite a user to the infra using email',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_admin_guard_1.GqlAdminGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'inviteeEmail',
        description: 'invitee email',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "inviteNewUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Delete an user account from infra',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_admin_guard_1.GqlAdminGuard),
    __param(0, (0, graphql_1.Args)({
        name: 'userUID',
        description: 'users UID',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "removeUserByAdmin", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Make user an admin',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_admin_guard_1.GqlAdminGuard),
    __param(0, (0, graphql_1.Args)({
        name: 'userUID',
        description: 'users UID',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "makeUserAdmin", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Remove user as admin',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_admin_guard_1.GqlAdminGuard),
    __param(0, (0, graphql_1.Args)({
        name: 'userUID',
        description: 'users UID',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "removeUserAsAdmin", null);
__decorate([
    (0, graphql_1.Mutation)(() => team_model_1.Team, {
        description: 'Create a new team by providing the user uid to nominate as Team owner',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_admin_guard_1.GqlAdminGuard),
    __param(0, (0, gql_admin_decorator_1.GqlAdmin)()),
    __param(1, (0, graphql_1.Args)({
        name: 'userUid',
        description: 'users uid to make team owner',
        type: () => graphql_1.ID,
    })),
    __param(2, (0, graphql_1.Args)({ name: 'name', description: 'Displayed name of the team' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_model_1.Admin, String, String]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "createTeamByAdmin", null);
__decorate([
    (0, graphql_1.Mutation)(() => team_model_1.TeamMember, {
        description: 'Change the role of a user in a team',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_admin_guard_1.GqlAdminGuard),
    __param(0, (0, gql_admin_decorator_1.GqlAdmin)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_model_1.Admin,
        input_types_args_2.ChangeUserRoleInTeamArgs]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "changeUserRoleInTeamByAdmin", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Remove the user from a team',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_admin_guard_1.GqlAdminGuard),
    __param(0, (0, gql_admin_decorator_1.GqlAdmin)()),
    __param(1, (0, graphql_1.Args)({
        name: 'userUid',
        description: 'users UID',
        type: () => graphql_1.ID,
    })),
    __param(2, (0, graphql_1.Args)({
        name: 'teamID',
        description: 'team ID',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_model_1.Admin, String, String]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "removeUserFromTeamByAdmin", null);
__decorate([
    (0, graphql_1.Mutation)(() => team_model_1.TeamMember, {
        description: 'Add a user to a team with email and team member role',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_admin_guard_1.GqlAdminGuard),
    __param(0, (0, gql_admin_decorator_1.GqlAdmin)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_model_1.Admin,
        input_types_args_2.AddUserToTeamArgs]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "addUserToTeamByAdmin", null);
__decorate([
    (0, graphql_1.Mutation)(() => team_model_1.Team, {
        description: 'Change a team name',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_admin_guard_1.GqlAdminGuard),
    __param(0, (0, gql_admin_decorator_1.GqlAdmin)()),
    __param(1, (0, graphql_1.Args)({ name: 'teamID', description: 'ID of the team', type: () => graphql_1.ID })),
    __param(2, (0, graphql_1.Args)({ name: 'newName', description: 'The updated name of the team' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_model_1.Admin, String, String]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "renameTeamByAdmin", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Delete a team',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_admin_guard_1.GqlAdminGuard),
    __param(0, (0, graphql_1.Args)({ name: 'teamID', description: 'ID of the team', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "deleteTeamByAdmin", null);
__decorate([
    (0, graphql_1.Subscription)(() => invited_user_model_1.InvitedUser, {
        description: 'Listen for User Invitation',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_admin_guard_1.GqlAdminGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminResolver.prototype, "userInvited", null);
AdminResolver = __decorate([
    (0, common_1.UseGuards)(gql_throttler_guard_1.GqlThrottlerGuard),
    (0, graphql_1.Resolver)(() => admin_model_1.Admin),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        pubsub_service_1.PubSubService])
], AdminResolver);
exports.AdminResolver = AdminResolver;
//# sourceMappingURL=admin.resolver.js.map