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
exports.TeamTeamInviteExtResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const team_model_1 = require("../team/team.model");
const team_invitation_model_1 = require("./team-invitation.model");
const team_invitation_service_1 = require("./team-invitation.service");
let TeamTeamInviteExtResolver = class TeamTeamInviteExtResolver {
    constructor(teamInviteService) {
        this.teamInviteService = teamInviteService;
    }
    teamInvitations(team) {
        return this.teamInviteService.getAllInvitationsInTeam(team)();
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => [team_invitation_model_1.TeamInvitation], {
        description: 'Get all the active invites in the team',
        complexity: 10,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_model_1.Team]),
    __metadata("design:returntype", Promise)
], TeamTeamInviteExtResolver.prototype, "teamInvitations", null);
TeamTeamInviteExtResolver = __decorate([
    (0, graphql_1.Resolver)(() => team_model_1.Team),
    __metadata("design:paramtypes", [team_invitation_service_1.TeamInvitationService])
], TeamTeamInviteExtResolver);
exports.TeamTeamInviteExtResolver = TeamTeamInviteExtResolver;
//# sourceMappingURL=team-teaminvite-ext.resolver.js.map