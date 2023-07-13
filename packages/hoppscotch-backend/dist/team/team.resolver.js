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
exports.TeamResolver = void 0;
const team_model_1 = require("./team.model");
const graphql_1 = require("@nestjs/graphql");
const team_service_1 = require("./team.service");
const gql_auth_guard_1 = require("../guards/gql-auth.guard");
const gql_user_decorator_1 = require("../decorators/gql-user.decorator");
const common_1 = require("@nestjs/common");
const requires_team_role_decorator_1 = require("./decorators/requires-team-role.decorator");
const gql_team_member_guard_1 = require("./guards/gql-team-member.guard");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const E = require("fp-ts/Either");
const utils_1 = require("../utils");
const gql_throttler_guard_1 = require("../guards/gql-throttler.guard");
const throttler_1 = require("@nestjs/throttler");
let TeamResolver = class TeamResolver {
    constructor(teamService, pubsub) {
        this.teamService = teamService;
        this.pubsub = pubsub;
    }
    members(team, cursor) {
        return this.teamService.getMembersOfTeam(team.id, cursor !== null && cursor !== void 0 ? cursor : null);
    }
    teamMembers(team) {
        return this.teamService.getTeamMembers(team.id);
    }
    myRole(team, user) {
        return this.teamService.getRoleOfUserInTeam(team.id, user.uid);
    }
    ownersCount(team) {
        return this.teamService.getCountOfUsersWithRoleInTeam(team.id, team_model_1.TeamMemberRole.OWNER);
    }
    editorsCount(team) {
        return this.teamService.getCountOfUsersWithRoleInTeam(team.id, team_model_1.TeamMemberRole.EDITOR);
    }
    viewersCount(team) {
        return this.teamService.getCountOfUsersWithRoleInTeam(team.id, team_model_1.TeamMemberRole.VIEWER);
    }
    myTeams(user, cursor) {
        return this.teamService.getTeamsOfUser(user.uid, cursor !== null && cursor !== void 0 ? cursor : null);
    }
    team(teamID) {
        return this.teamService.getTeamWithID(teamID);
    }
    async createTeam(user, name) {
        const team = await this.teamService.createTeam(name, user.uid);
        if (E.isLeft(team))
            (0, utils_1.throwErr)(team.left);
        return team.right;
    }
    async leaveTeam(user, teamID) {
        const isUserLeft = await this.teamService.leaveTeam(teamID, user.uid);
        if (E.isLeft(isUserLeft))
            (0, utils_1.throwErr)(isUserLeft.left);
        return isUserLeft.right;
    }
    async removeTeamMember(_user, teamID, userUid) {
        const isRemoved = await this.teamService.leaveTeam(teamID, userUid);
        if (E.isLeft(isRemoved))
            (0, utils_1.throwErr)(isRemoved.left);
        return isRemoved.right;
    }
    async renameTeam(teamID, newName) {
        const team = await this.teamService.renameTeam(teamID, newName);
        if (E.isLeft(team))
            (0, utils_1.throwErr)(team.left);
        return team.right;
    }
    async deleteTeam(teamID) {
        const isDeleted = await this.teamService.deleteTeam(teamID);
        if (E.isLeft(isDeleted))
            (0, utils_1.throwErr)(isDeleted.left);
        return isDeleted.right;
    }
    async updateTeamMemberRole(teamID, userUid, newRole) {
        const teamMember = await this.teamService.updateTeamMemberRole(teamID, userUid, newRole);
        if (E.isLeft(teamMember))
            (0, utils_1.throwErr)(teamMember.left);
        return teamMember.right;
    }
    teamMemberAdded(teamID) {
        return this.pubsub.asyncIterator(`team/${teamID}/member_added`);
    }
    teamMemberUpdated(teamID) {
        return this.pubsub.asyncIterator(`team/${teamID}/member_updated`);
    }
    teamMemberRemoved(teamID) {
        return this.pubsub.asyncIterator(`team/${teamID}/member_removed`);
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => [team_model_1.TeamMember], {
        description: 'Returns the list of members of a team',
        complexity: 10,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Args)({
        name: 'cursor',
        type: () => graphql_1.ID,
        description: 'The ID of the last returned team member entry (used for pagination)',
        nullable: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_model_1.Team, String]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "members", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [team_model_1.TeamMember], {
        description: 'Returns the list of members of a team',
        complexity: 10,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_model_1.Team]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "teamMembers", null);
__decorate([
    (0, graphql_1.ResolveField)(() => team_model_1.TeamMemberRole, {
        description: 'The role of the current user in the team',
        nullable: true,
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_model_1.Team, Object]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "myRole", null);
__decorate([
    (0, graphql_1.ResolveField)(() => graphql_1.Int, {
        description: 'The number of users with the OWNER role in the team',
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_model_1.Team]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "ownersCount", null);
__decorate([
    (0, graphql_1.ResolveField)(() => graphql_1.Int, {
        description: 'The number of users with the EDITOR role in the team',
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_model_1.Team]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "editorsCount", null);
__decorate([
    (0, graphql_1.ResolveField)(() => graphql_1.Int, {
        description: 'The number of users with the VIEWER role in the team',
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_model_1.Team]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "viewersCount", null);
__decorate([
    (0, graphql_1.Query)(() => [team_model_1.Team], {
        description: 'List of teams that the executing user belongs to.',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'cursor',
        type: () => graphql_1.ID,
        description: 'The ID of the last returned team entry (used for pagination)',
        nullable: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "myTeams", null);
__decorate([
    (0, graphql_1.Query)(() => team_model_1.Team, {
        description: 'Returns the detail of the team with the given ID',
        nullable: true,
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.VIEWER, team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.OWNER),
    __param(0, (0, graphql_1.Args)({
        name: 'teamID',
        type: () => graphql_1.ID,
        description: 'ID of the team to check',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "team", null);
__decorate([
    (0, graphql_1.Mutation)(() => team_model_1.Team, {
        description: 'Creates a team owned by the executing user',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({ name: 'name', description: 'Displayed name of the team' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "createTeam", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Leaves a team the executing user is a part of',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'teamID',
        description: 'ID of the Team to leave',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "leaveTeam", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Removes the team member from the team',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'teamID',
        description: 'ID of the Team to remove user from',
        type: () => graphql_1.ID,
    })),
    __param(2, (0, graphql_1.Args)({
        name: 'userUid',
        description: 'ID of the user to remove from the given team',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "removeTeamMember", null);
__decorate([
    (0, graphql_1.Mutation)(() => team_model_1.Team, {
        description: 'Renames a team',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER),
    __param(0, (0, graphql_1.Args)({ name: 'teamID', description: 'ID of the team', type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)({ name: 'newName', description: 'The updated name of the team' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "renameTeam", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Deletes the team',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER),
    __param(0, (0, graphql_1.Args)({ name: 'teamID', description: 'ID of the team', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "deleteTeam", null);
__decorate([
    (0, graphql_1.Mutation)(() => team_model_1.TeamMember, {
        description: 'Update role of a team member the executing user owns',
    }),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    __param(0, (0, graphql_1.Args)({
        name: 'teamID',
        description: 'ID of the affected team',
        type: () => graphql_1.ID,
    })),
    __param(1, (0, graphql_1.Args)({
        name: 'userUid',
        description: 'UID of the affected user',
        type: () => graphql_1.ID,
    })),
    __param(2, (0, graphql_1.Args)({
        name: 'newRole',
        description: 'Updated role value',
        type: () => team_model_1.TeamMemberRole,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "updateTeamMemberRole", null);
__decorate([
    (0, graphql_1.Subscription)(() => team_model_1.TeamMember, {
        description: 'Listen to when a new team member being added to the team. The emitted value is the new team member added.',
        resolve: (value) => value,
    }),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.VIEWER),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    __param(0, (0, graphql_1.Args)({
        name: 'teamID',
        description: 'ID of the team to listen to',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], TeamResolver.prototype, "teamMemberAdded", null);
__decorate([
    (0, graphql_1.Subscription)(() => team_model_1.TeamMember, {
        description: 'Listen to when a team member status has been updated. The emitted value is the new team member status',
        resolve: (value) => value,
    }),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.VIEWER),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    __param(0, (0, graphql_1.Args)({
        name: 'teamID',
        description: 'ID of the team to listen to',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], TeamResolver.prototype, "teamMemberUpdated", null);
__decorate([
    (0, graphql_1.Subscription)(() => graphql_1.ID, {
        description: 'Listen to when a team member has been removed. The emitted value is the uid of the user removed',
        resolve: (value) => value,
    }),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.VIEWER),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    __param(0, (0, graphql_1.Args)({
        name: 'teamID',
        description: 'ID of the team to listen to',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], TeamResolver.prototype, "teamMemberRemoved", null);
TeamResolver = __decorate([
    (0, common_1.UseGuards)(gql_throttler_guard_1.GqlThrottlerGuard),
    (0, graphql_1.Resolver)(() => team_model_1.Team),
    __metadata("design:paramtypes", [team_service_1.TeamService,
        pubsub_service_1.PubSubService])
], TeamResolver);
exports.TeamResolver = TeamResolver;
//# sourceMappingURL=team.resolver.js.map