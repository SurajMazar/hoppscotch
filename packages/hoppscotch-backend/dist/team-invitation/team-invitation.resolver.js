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
exports.TeamInvitationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const team_invitation_model_1 = require("./team-invitation.model");
const team_invitation_service_1 = require("./team-invitation.service");
const function_1 = require("fp-ts/function");
const TE = require("fp-ts/TaskEither");
const O = require("fp-ts/Option");
const team_model_1 = require("../team/team.model");
const Email_1 = require("../types/Email");
const errors_1 = require("../errors");
const gql_user_decorator_1 = require("../decorators/gql-user.decorator");
const user_model_1 = require("../user/user.model");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../guards/gql-auth.guard");
const team_service_1 = require("../team/team.service");
const utils_1 = require("../utils");
const team_invitee_guard_1 = require("./team-invitee.guard");
const gql_team_member_guard_1 = require("../team/guards/gql-team-member.guard");
const requires_team_role_decorator_1 = require("../team/decorators/requires-team-role.decorator");
const team_invite_viewer_guard_1 = require("./team-invite-viewer.guard");
const team_invite_team_owner_guard_1 = require("./team-invite-team-owner.guard");
const user_service_1 = require("../user/user.service");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const gql_throttler_guard_1 = require("../guards/gql-throttler.guard");
const throttler_1 = require("@nestjs/throttler");
let TeamInvitationResolver = class TeamInvitationResolver {
    constructor(userService, teamService, teamInvitationService, pubsub) {
        this.userService = userService;
        this.teamService = teamService;
        this.teamInvitationService = teamInvitationService;
        this.pubsub = pubsub;
    }
    async team(teamInvitation) {
        return (0, function_1.pipe)(this.teamService.getTeamWithIDTE(teamInvitation.teamID), TE.getOrElse(utils_1.throwErr))();
    }
    async creator(teamInvitation) {
        const user = await this.userService.findUserById(teamInvitation.creatorUid);
        if (O.isNone(user))
            (0, utils_1.throwErr)(errors_1.USER_NOT_FOUND);
        return Object.assign(Object.assign({}, user.value), { currentGQLSession: JSON.stringify(user.value.currentGQLSession), currentRESTSession: JSON.stringify(user.value.currentRESTSession) });
    }
    teamInvitation(user, inviteID) {
        return (0, function_1.pipe)(this.teamInvitationService.getInvitation(inviteID), TE.fromTaskOption(() => errors_1.TEAM_INVITE_NO_INVITE_FOUND), TE.chainW(TE.fromPredicate((a) => { var _a; return a.inviteeEmail.toLowerCase() === ((_a = user.email) === null || _a === void 0 ? void 0 : _a.toLowerCase()); }, () => errors_1.TEAM_INVITE_EMAIL_DO_NOT_MATCH)), TE.getOrElse(utils_1.throwErr))();
    }
    createTeamInvitation(user, teamID, inviteeEmail, inviteeRole) {
        return (0, function_1.pipe)(TE.Do, TE.bindW('email', () => (0, function_1.pipe)(Email_1.EmailCodec.decode(inviteeEmail), TE.fromEither, TE.mapLeft(() => errors_1.INVALID_EMAIL))), TE.bindW('team', () => this.teamService.getTeamWithIDTE(teamID)), TE.chainW(({ email, team }) => this.teamInvitationService.createInvitation(user, team, email, inviteeRole)), TE.getOrElse(utils_1.throwErr))();
    }
    revokeTeamInvitation(inviteID) {
        return (0, function_1.pipe)(this.teamInvitationService.revokeInvitation(inviteID), TE.map(() => true), TE.getOrElse(utils_1.throwErr))();
    }
    acceptTeamInvitation(user, inviteID) {
        return (0, function_1.pipe)(this.teamInvitationService.acceptInvitation(inviteID, user), TE.getOrElse(utils_1.throwErr))();
    }
    teamInvitationAdded(teamID) {
        return this.pubsub.asyncIterator(`team/${teamID}/invite_added`);
    }
    teamInvitationRemoved(teamID) {
        return this.pubsub.asyncIterator(`team/${teamID}/invite_removed`);
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => team_model_1.Team, {
        complexity: 5,
        description: 'Get the team associated to the invite',
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_invitation_model_1.TeamInvitation]),
    __metadata("design:returntype", Promise)
], TeamInvitationResolver.prototype, "team", null);
__decorate([
    (0, graphql_1.ResolveField)(() => user_model_1.User, {
        complexity: 5,
        description: 'Get the creator of the invite',
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_invitation_model_1.TeamInvitation]),
    __metadata("design:returntype", Promise)
], TeamInvitationResolver.prototype, "creator", null);
__decorate([
    (0, graphql_1.Query)(() => team_invitation_model_1.TeamInvitation, {
        description: 'Gets the Team Invitation with the given ID, or null if not exists',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, team_invite_viewer_guard_1.TeamInviteViewerGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'inviteID',
        description: 'ID of the Team Invitation to lookup',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, String]),
    __metadata("design:returntype", Promise)
], TeamInvitationResolver.prototype, "teamInvitation", null);
__decorate([
    (0, graphql_1.Mutation)(() => team_invitation_model_1.TeamInvitation, {
        description: 'Creates a Team Invitation',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'teamID',
        description: 'ID of the Team ID to invite from',
        type: () => graphql_1.ID,
    })),
    __param(2, (0, graphql_1.Args)({
        name: 'inviteeEmail',
        description: 'Email of the user to invite',
    })),
    __param(3, (0, graphql_1.Args)({
        name: 'inviteeRole',
        type: () => team_model_1.TeamMemberRole,
        description: 'Role to be given to the user',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, String, String, String]),
    __metadata("design:returntype", Promise)
], TeamInvitationResolver.prototype, "createTeamInvitation", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Revokes an invitation and deletes it',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, team_invite_team_owner_guard_1.TeamInviteTeamOwnerGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER),
    __param(0, (0, graphql_1.Args)({
        name: 'inviteID',
        type: () => graphql_1.ID,
        description: 'ID of the invite to revoke',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamInvitationResolver.prototype, "revokeTeamInvitation", null);
__decorate([
    (0, graphql_1.Mutation)(() => team_model_1.TeamMember, {
        description: 'Accept an Invitation',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, team_invitee_guard_1.TeamInviteeGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'inviteID',
        type: () => graphql_1.ID,
        description: 'ID of the Invite to accept',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, String]),
    __metadata("design:returntype", Promise)
], TeamInvitationResolver.prototype, "acceptTeamInvitation", null);
__decorate([
    (0, graphql_1.Subscription)(() => team_invitation_model_1.TeamInvitation, {
        description: 'Listens to when a Team Invitation is added',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.VIEWER),
    __param(0, (0, graphql_1.Args)({
        name: 'teamID',
        type: () => graphql_1.ID,
        description: 'ID of the Team to listen to',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], TeamInvitationResolver.prototype, "teamInvitationAdded", null);
__decorate([
    (0, graphql_1.Subscription)(() => graphql_1.ID, {
        description: 'Listens to when a Team Invitation is removed',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.VIEWER),
    __param(0, (0, graphql_1.Args)({
        name: 'teamID',
        type: () => graphql_1.ID,
        description: 'ID of the Team to listen to',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], TeamInvitationResolver.prototype, "teamInvitationRemoved", null);
TeamInvitationResolver = __decorate([
    (0, common_1.UseGuards)(gql_throttler_guard_1.GqlThrottlerGuard),
    (0, graphql_1.Resolver)(() => team_invitation_model_1.TeamInvitation),
    __metadata("design:paramtypes", [user_service_1.UserService,
        team_service_1.TeamService,
        team_invitation_service_1.TeamInvitationService,
        pubsub_service_1.PubSubService])
], TeamInvitationResolver);
exports.TeamInvitationResolver = TeamInvitationResolver;
//# sourceMappingURL=team-invitation.resolver.js.map