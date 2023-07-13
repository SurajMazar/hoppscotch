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
exports.GqlCollectionTeamMemberGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
const team_collection_service_1 = require("../team-collection.service");
const team_service_1 = require("../../team/team.service");
const errors_1 = require("../../errors");
const E = require("fp-ts/Either");
let GqlCollectionTeamMemberGuard = class GqlCollectionTeamMemberGuard {
    constructor(reflector, teamService, teamCollectionService) {
        this.reflector = reflector;
        this.teamService = teamService;
        this.teamCollectionService = teamCollectionService;
    }
    async canActivate(context) {
        const requireRoles = this.reflector.get('requiresTeamRole', context.getHandler());
        if (!requireRoles)
            throw new Error(errors_1.BUG_TEAM_NO_REQUIRE_TEAM_ROLE);
        const gqlExecCtx = graphql_1.GqlExecutionContext.create(context);
        const { user } = gqlExecCtx.getContext().req;
        if (user == undefined)
            throw new Error(errors_1.BUG_AUTH_NO_USER_CTX);
        const { collectionID } = gqlExecCtx.getArgs();
        if (!collectionID)
            throw new Error(errors_1.BUG_TEAM_COLL_NO_COLL_ID);
        const collection = await this.teamCollectionService.getCollection(collectionID);
        if (E.isLeft(collection))
            throw new Error(errors_1.TEAM_INVALID_COLL_ID);
        const member = await this.teamService.getTeamMember(collection.right.teamID, user.uid);
        if (!member)
            throw new Error(errors_1.TEAM_REQ_NOT_MEMBER);
        return requireRoles.includes(member.role);
    }
};
GqlCollectionTeamMemberGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        team_service_1.TeamService,
        team_collection_service_1.TeamCollectionService])
], GqlCollectionTeamMemberGuard);
exports.GqlCollectionTeamMemberGuard = GqlCollectionTeamMemberGuard;
//# sourceMappingURL=gql-collection-team-member.guard.js.map