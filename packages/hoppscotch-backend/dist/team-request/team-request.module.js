"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRequestModule = void 0;
const common_1 = require("@nestjs/common");
const team_request_service_1 = require("./team-request.service");
const team_request_resolver_1 = require("./team-request.resolver");
const prisma_module_1 = require("../prisma/prisma.module");
const team_module_1 = require("../team/team.module");
const team_collection_module_1 = require("../team-collection/team-collection.module");
const gql_request_team_member_guard_1 = require("./guards/gql-request-team-member.guard");
const user_module_1 = require("../user/user.module");
const pubsub_module_1 = require("../pubsub/pubsub.module");
let TeamRequestModule = class TeamRequestModule {
};
TeamRequestModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            team_module_1.TeamModule,
            team_collection_module_1.TeamCollectionModule,
            user_module_1.UserModule,
            pubsub_module_1.PubSubModule,
        ],
        providers: [
            team_request_service_1.TeamRequestService,
            team_request_resolver_1.TeamRequestResolver,
            gql_request_team_member_guard_1.GqlRequestTeamMemberGuard,
        ],
        exports: [team_request_service_1.TeamRequestService, gql_request_team_member_guard_1.GqlRequestTeamMemberGuard],
    })
], TeamRequestModule);
exports.TeamRequestModule = TeamRequestModule;
//# sourceMappingURL=team-request.module.js.map