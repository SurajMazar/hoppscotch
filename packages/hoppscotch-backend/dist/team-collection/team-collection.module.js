"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamCollectionModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const team_collection_service_1 = require("./team-collection.service");
const team_collection_resolver_1 = require("./team-collection.resolver");
const gql_collection_team_member_guard_1 = require("./guards/gql-collection-team-member.guard");
const team_module_1 = require("../team/team.module");
const user_module_1 = require("../user/user.module");
const pubsub_module_1 = require("../pubsub/pubsub.module");
let TeamCollectionModule = class TeamCollectionModule {
};
TeamCollectionModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, team_module_1.TeamModule, user_module_1.UserModule, pubsub_module_1.PubSubModule],
        providers: [
            team_collection_service_1.TeamCollectionService,
            team_collection_resolver_1.TeamCollectionResolver,
            gql_collection_team_member_guard_1.GqlCollectionTeamMemberGuard,
        ],
        exports: [team_collection_service_1.TeamCollectionService, gql_collection_team_member_guard_1.GqlCollectionTeamMemberGuard],
    })
], TeamCollectionModule);
exports.TeamCollectionModule = TeamCollectionModule;
//# sourceMappingURL=team-collection.module.js.map