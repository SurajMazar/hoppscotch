"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModule = void 0;
const common_1 = require("@nestjs/common");
const team_service_1 = require("./team.service");
const team_resolver_1 = require("./team.resolver");
const user_module_1 = require("../user/user.module");
const team_member_resolver_1 = require("./team-member.resolver");
const gql_team_member_guard_1 = require("./guards/gql-team-member.guard");
const prisma_module_1 = require("../prisma/prisma.module");
const pubsub_module_1 = require("../pubsub/pubsub.module");
let TeamModule = class TeamModule {
};
TeamModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, pubsub_module_1.PubSubModule, prisma_module_1.PrismaModule],
        providers: [
            team_service_1.TeamService,
            team_resolver_1.TeamResolver,
            team_member_resolver_1.TeamMemberResolver,
            gql_team_member_guard_1.GqlTeamMemberGuard,
        ],
        exports: [team_service_1.TeamService, gql_team_member_guard_1.GqlTeamMemberGuard],
    })
], TeamModule);
exports.TeamModule = TeamModule;
//# sourceMappingURL=team.module.js.map