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
exports.TeamInviteViewerGuard = void 0;
const common_1 = require("@nestjs/common");
const team_invitation_service_1 = require("./team-invitation.service");
const function_1 = require("fp-ts/function");
const TE = require("fp-ts/TaskEither");
const T = require("fp-ts/Task");
const O = require("fp-ts/Option");
const graphql_1 = require("@nestjs/graphql");
const errors_1 = require("../errors");
const utils_1 = require("../utils");
const team_service_1 = require("../team/team.service");
let TeamInviteViewerGuard = class TeamInviteViewerGuard {
    constructor(teamInviteService, teamService) {
        this.teamInviteService = teamInviteService;
        this.teamService = teamService;
    }
    async canActivate(context) {
        return (0, function_1.pipe)(TE.Do, TE.bindW('gqlCtx', () => TE.of(graphql_1.GqlExecutionContext.create(context))), TE.bindW('user', ({ gqlCtx }) => (0, function_1.pipe)(O.fromNullable(gqlCtx.getContext().req.user), TE.fromOption(() => errors_1.BUG_AUTH_NO_USER_CTX))), TE.bindW('invite', ({ gqlCtx }) => (0, function_1.pipe)(O.fromNullable(gqlCtx.getArgs().inviteID), TE.fromOption(() => errors_1.BUG_TEAM_INVITE_NO_INVITE_ID), TE.chainW((0, function_1.flow)(this.teamInviteService.getInvitation, TE.fromTaskOption(() => errors_1.TEAM_INVITE_NO_INVITE_FOUND))))), TE.chainW(({ user, invite }) => {
            var _a;
            return ((_a = user.email) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === invite.inviteeEmail.toLowerCase()
                ? TE.of(true)
                : (0, function_1.pipe)(this.teamService.getTeamMemberTE(invite.teamID, user.uid), TE.map(() => true));
        }), TE.mapLeft((e) => e === 'team/member_not_found' ? errors_1.TEAM_INVITE_NOT_VALID_VIEWER : e), TE.fold(utils_1.throwErr, () => T.of(true)))();
    }
};
TeamInviteViewerGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [team_invitation_service_1.TeamInvitationService,
        team_service_1.TeamService])
], TeamInviteViewerGuard);
exports.TeamInviteViewerGuard = TeamInviteViewerGuard;
//# sourceMappingURL=team-invite-viewer.guard.js.map