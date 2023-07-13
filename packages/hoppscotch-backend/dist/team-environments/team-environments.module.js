"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamEnvironmentsModule = void 0;
const common_1 = require("@nestjs/common");
const team_environments_service_1 = require("./team-environments.service");
const team_environments_resolver_1 = require("./team-environments.resolver");
const user_module_1 = require("../user/user.module");
const pubsub_module_1 = require("../pubsub/pubsub.module");
const team_module_1 = require("../team/team.module");
const prisma_module_1 = require("../prisma/prisma.module");
const gql_team_env_team_guard_1 = require("./gql-team-env-team.guard");
const team_resolver_1 = require("./team.resolver");
let TeamEnvironmentsModule = class TeamEnvironmentsModule {
};
TeamEnvironmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, pubsub_module_1.PubSubModule, user_module_1.UserModule, team_module_1.TeamModule],
        providers: [
            team_environments_resolver_1.TeamEnvironmentsResolver,
            team_environments_service_1.TeamEnvironmentsService,
            gql_team_env_team_guard_1.GqlTeamEnvTeamGuard,
            team_resolver_1.TeamEnvsTeamResolver,
        ],
        exports: [team_environments_service_1.TeamEnvironmentsService, gql_team_env_team_guard_1.GqlTeamEnvTeamGuard],
    })
], TeamEnvironmentsModule);
exports.TeamEnvironmentsModule = TeamEnvironmentsModule;
//# sourceMappingURL=team-environments.module.js.map