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
exports.TeamInviteTeamOwnerGuard = void 0;
const common_1 = require("@nestjs/common");
const function_1 = require("fp-ts/function");
const team_service_1 = require("../team/team.service");
const team_invitation_service_1 = require("./team-invitation.service");
const O = require("fp-ts/Option");
const T = require("fp-ts/Task");
const TE = require("fp-ts/TaskEither");
const graphql_1 = require("@nestjs/graphql");
const errors_1 = require("../errors");
const utils_1 = require("../utils");
const team_model_1 = require("../team/team.model");
let TeamInviteTeamOwnerGuard = class TeamInviteTeamOwnerGuard {
    constructor(teamService, teamInviteService) {
        this.teamService = teamService;
        this.teamInviteService = teamInviteService;
    }
    async canActivate(context) {
        return (0, function_1.pipe)(TE.Do, TE.bindW('gqlCtx', () => TE.of(graphql_1.GqlExecutionContext.create(context))), TE.bindW('invite', ({ gqlCtx }) => (0, function_1.pipe)(O.fromNullable(gqlCtx.getArgs().inviteID), TE.fromOption(() => errors_1.BUG_TEAM_INVITE_NO_INVITE_ID), TE.chainW((inviteID) => (0, function_1.pipe)(this.teamInviteService.getInvitation(inviteID), TE.fromTaskOption(() => errors_1.TEAM_INVITE_NO_INVITE_FOUND))))), TE.bindW('user', ({ gqlCtx }) => (0, function_1.pipe)(gqlCtx.getContext().req.user, O.fromNullable, TE.fromOption(() => errors_1.BUG_AUTH_NO_USER_CTX))), TE.bindW('userMember', ({ invite, user }) => this.teamService.getTeamMemberTE(invite.teamID, user.uid)), TE.chainW(TE.fromPredicate(({ userMember }) => userMember.role === team_model_1.TeamMemberRole.OWNER, () => errors_1.TEAM_NOT_REQUIRED_ROLE)), TE.fold((err) => (0, utils_1.throwErr)(err), () => T.of(true)))();
    }
};
TeamInviteTeamOwnerGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [team_service_1.TeamService,
        team_invitation_service_1.TeamInvitationService])
], TeamInviteTeamOwnerGuard);
exports.TeamInviteTeamOwnerGuard = TeamInviteTeamOwnerGuard;
//# sourceMappingURL=team-invite-team-owner.guard.js.map