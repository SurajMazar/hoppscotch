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
exports.GqlTeamMemberGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const team_service_1 = require("../team.service");
const graphql_1 = require("@nestjs/graphql");
const errors_1 = require("../../errors");
let GqlTeamMemberGuard = class GqlTeamMemberGuard {
    constructor(reflector, teamService) {
        this.reflector = reflector;
        this.teamService = teamService;
    }
    async canActivate(context) {
        const requireRoles = this.reflector.get('requiresTeamRole', context.getHandler());
        if (!requireRoles)
            throw new Error(errors_1.BUG_TEAM_NO_REQUIRE_TEAM_ROLE);
        const gqlExecCtx = graphql_1.GqlExecutionContext.create(context);
        const { req, headers } = gqlExecCtx.getContext();
        const user = headers ? headers.user : req.user;
        if (user == undefined)
            throw new Error(errors_1.BUG_AUTH_NO_USER_CTX);
        const { teamID } = gqlExecCtx.getArgs();
        if (!teamID)
            throw new Error(errors_1.BUG_TEAM_NO_TEAM_ID);
        const teamMember = await this.teamService.getTeamMember(teamID, user.uid);
        if (!teamMember)
            throw new Error(errors_1.TEAM_MEMBER_NOT_FOUND);
        if (requireRoles.includes(teamMember.role))
            return true;
        throw new Error(errors_1.TEAM_NOT_REQUIRED_ROLE);
    }
};
GqlTeamMemberGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        team_service_1.TeamService])
], GqlTeamMemberGuard);
exports.GqlTeamMemberGuard = GqlTeamMemberGuard;
//# sourceMappingURL=gql-team-member.guard.js.map