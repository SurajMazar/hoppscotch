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
exports.GqlRequestTeamMemberGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const team_request_service_1 = require("../team-request.service");
const team_service_1 = require("../../team/team.service");
const core_1 = require("@nestjs/core");
const errors_1 = require("../../errors");
const utils_1 = require("../../utils");
const O = require("fp-ts/Option");
let GqlRequestTeamMemberGuard = class GqlRequestTeamMemberGuard {
    constructor(reflector, teamRequestService, teamService) {
        this.reflector = reflector;
        this.teamRequestService = teamRequestService;
        this.teamService = teamService;
    }
    async canActivate(context) {
        const requireRoles = this.reflector.get('requiresTeamRole', context.getHandler());
        const gqlExecCtx = graphql_1.GqlExecutionContext.create(context);
        const { user } = gqlExecCtx.getContext().req;
        if (!user)
            throw new Error(errors_1.BUG_AUTH_NO_USER_CTX);
        const { requestID } = gqlExecCtx.getArgs();
        if (!requestID)
            throw new Error(errors_1.BUG_TEAM_REQ_NO_REQ_ID);
        const team = await this.teamRequestService.getTeamOfRequestFromID(requestID);
        if (O.isNone(team))
            throw new Error(errors_1.TEAM_REQ_NOT_FOUND);
        const member = await this.teamService.getTeamMember(team.value.id, user.uid);
        if (!member)
            (0, utils_1.throwErr)(errors_1.TEAM_REQ_NOT_MEMBER);
        if (!(requireRoles && requireRoles.includes(member.role)))
            throw new Error(errors_1.TEAM_REQ_NOT_REQUIRED_ROLE);
        return true;
    }
};
GqlRequestTeamMemberGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        team_request_service_1.TeamRequestService,
        team_service_1.TeamService])
], GqlRequestTeamMemberGuard);
exports.GqlRequestTeamMemberGuard = GqlRequestTeamMemberGuard;
//# sourceMappingURL=gql-request-team-member.guard.js.map