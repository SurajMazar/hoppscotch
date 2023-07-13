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
exports.TeamInviteeGuard = void 0;
const common_1 = require("@nestjs/common");
const team_invitation_service_1 = require("./team-invitation.service");
const function_1 = require("fp-ts/function");
const O = require("fp-ts/Option");
const T = require("fp-ts/Task");
const TE = require("fp-ts/TaskEither");
const graphql_1 = require("@nestjs/graphql");
const errors_1 = require("../errors");
const utils_1 = require("../utils");
let TeamInviteeGuard = class TeamInviteeGuard {
    constructor(teamInviteService) {
        this.teamInviteService = teamInviteService;
    }
    async canActivate(context) {
        return (0, function_1.pipe)(TE.Do, TE.bindW('gqlCtx', () => TE.of(graphql_1.GqlExecutionContext.create(context))), TE.bindW('user', ({ gqlCtx }) => (0, function_1.pipe)(O.fromNullable(gqlCtx.getContext().req.user), TE.fromOption(() => errors_1.BUG_AUTH_NO_USER_CTX))), TE.bindW('invite', ({ gqlCtx }) => (0, function_1.pipe)(O.fromNullable(gqlCtx.getArgs().inviteID), TE.fromOption(() => errors_1.BUG_TEAM_INVITE_NO_INVITE_ID), TE.chainW((0, function_1.flow)(this.teamInviteService.getInvitation, TE.fromTaskOption(() => errors_1.TEAM_INVITE_NO_INVITE_FOUND))))), TE.chainW(TE.fromPredicate(({ user, invite }) => user.email === invite.inviteeEmail, () => errors_1.TEAM_INVITE_EMAIL_DO_NOT_MATCH)), TE.fold(utils_1.throwErr, () => T.of(true)))();
    }
};
TeamInviteeGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [team_invitation_service_1.TeamInvitationService])
], TeamInviteeGuard);
exports.TeamInviteeGuard = TeamInviteeGuard;
//# sourceMappingURL=team-invitee.guard.js.map