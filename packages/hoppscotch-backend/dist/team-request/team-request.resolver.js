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
exports.TeamRequestResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const team_request_model_1 = require("./team-request.model");
const input_type_args_1 = require("./input-type.args");
const team_model_1 = require("../team/team.model");
const team_request_service_1 = require("./team-request.service");
const team_collection_model_1 = require("../team-collection/team-collection.model");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../guards/gql-auth.guard");
const gql_request_team_member_guard_1 = require("./guards/gql-request-team-member.guard");
const gql_collection_team_member_guard_1 = require("../team-collection/guards/gql-collection-team-member.guard");
const requires_team_role_decorator_1 = require("../team/decorators/requires-team-role.decorator");
const gql_team_member_guard_1 = require("../team/guards/gql-team-member.guard");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const E = require("fp-ts/Either");
const O = require("fp-ts/Option");
const utils_1 = require("../utils");
const gql_throttler_guard_1 = require("../guards/gql-throttler.guard");
const throttler_1 = require("@nestjs/throttler");
let TeamRequestResolver = class TeamRequestResolver {
    constructor(teamRequestService, pubsub) {
        this.teamRequestService = teamRequestService;
        this.pubsub = pubsub;
    }
    async team(req) {
        const team = await this.teamRequestService.getTeamOfRequest(req);
        if (E.isLeft(team))
            (0, utils_1.throwErr)(team.left);
        return team.right;
    }
    async collection(req) {
        const teamCollection = await this.teamRequestService.getCollectionOfRequest(req);
        if (E.isLeft(teamCollection))
            (0, utils_1.throwErr)(teamCollection.left);
        return teamCollection.right;
    }
    async searchForRequest(args) {
        return this.teamRequestService.searchRequest(args.teamID, args.searchTerm, args.cursor, args.take);
    }
    async request(requestID) {
        const teamRequest = await this.teamRequestService.getRequest(requestID);
        if (O.isNone(teamRequest))
            return null;
        return teamRequest.value;
    }
    async requestsInCollection(input) {
        return this.teamRequestService.getRequestsInCollection(input.collectionID, input.cursor, input.take);
    }
    async createRequestInCollection(collectionID, data) {
        const teamRequest = await this.teamRequestService.createTeamRequest(collectionID, data.teamID, data.title, data.request);
        if (E.isLeft(teamRequest))
            (0, utils_1.throwErr)(teamRequest.left);
        return teamRequest.right;
    }
    async updateRequest(requestID, data) {
        const teamRequest = await this.teamRequestService.updateTeamRequest(requestID, data.title, data.request);
        if (E.isLeft(teamRequest))
            (0, utils_1.throwErr)(teamRequest.left);
        return teamRequest.right;
    }
    async deleteRequest(requestID) {
        const isDeleted = await this.teamRequestService.deleteTeamRequest(requestID);
        if (E.isLeft(isDeleted))
            (0, utils_1.throwErr)(isDeleted.left);
        return isDeleted.right;
    }
    async updateLookUpRequestOrder(args) {
        const teamRequest = await this.teamRequestService.moveRequest(args.collectionID, args.requestID, args.collectionID, args.nextRequestID, 'updateLookUpRequestOrder');
        if (E.isLeft(teamRequest))
            (0, utils_1.throwErr)(teamRequest.left);
        return true;
    }
    async moveRequest(args) {
        const teamRequest = await this.teamRequestService.moveRequest(args.srcCollID, args.requestID, args.destCollID, args.nextRequestID, 'moveRequest');
        if (E.isLeft(teamRequest))
            (0, utils_1.throwErr)(teamRequest.left);
        return teamRequest.right;
    }
    teamRequestAdded(teamID) {
        return this.pubsub.asyncIterator(`team_req/${teamID}/req_created`);
    }
    teamRequestUpdated(teamID) {
        return this.pubsub.asyncIterator(`team_req/${teamID}/req_updated`);
    }
    teamRequestDeleted(teamID) {
        return this.pubsub.asyncIterator(`team_req/${teamID}/req_deleted`);
    }
    requestOrderUpdated(teamID) {
        return this.pubsub.asyncIterator(`team_req/${teamID}/req_order_updated`);
    }
    requestMoved(teamID) {
        return this.pubsub.asyncIterator(`team_req/${teamID}/req_moved`);
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => team_model_1.Team, {
        description: 'Team the request belongs to',
        complexity: 3,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_request_model_1.TeamRequest]),
    __metadata("design:returntype", Promise)
], TeamRequestResolver.prototype, "team", null);
__decorate([
    (0, graphql_1.ResolveField)(() => team_collection_model_1.TeamCollection, {
        description: 'Collection the request belongs to',
        complexity: 3,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_request_model_1.TeamRequest]),
    __metadata("design:returntype", Promise)
], TeamRequestResolver.prototype, "collection", null);
__decorate([
    (0, graphql_1.Query)(() => [team_request_model_1.TeamRequest], {
        description: 'Search the team for a specific request with title',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.VIEWER),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_type_args_1.SearchTeamRequestArgs]),
    __metadata("design:returntype", Promise)
], TeamRequestResolver.prototype, "searchForRequest", null);
__decorate([
    (0, graphql_1.Query)(() => team_request_model_1.TeamRequest, {
        description: 'Gives a request with the given ID or null (if not exists)',
        nullable: true,
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_request_team_member_guard_1.GqlRequestTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.VIEWER),
    __param(0, (0, graphql_1.Args)({
        name: 'requestID',
        description: 'ID of the request',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamRequestResolver.prototype, "request", null);
__decorate([
    (0, graphql_1.Query)(() => [team_request_model_1.TeamRequest], {
        description: 'Gives a paginated list of requests in the collection',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_collection_team_member_guard_1.GqlCollectionTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.VIEWER),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_type_args_1.GetTeamRequestInCollectionArgs]),
    __metadata("design:returntype", Promise)
], TeamRequestResolver.prototype, "requestsInCollection", null);
__decorate([
    (0, graphql_1.Mutation)(() => team_request_model_1.TeamRequest, {
        description: 'Create a team request in the given collection.',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_collection_team_member_guard_1.GqlCollectionTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.OWNER),
    __param(0, (0, graphql_1.Args)({
        name: 'collectionID',
        description: 'ID of the collection',
        type: () => graphql_1.ID,
    })),
    __param(1, (0, graphql_1.Args)({
        name: 'data',
        type: () => input_type_args_1.CreateTeamRequestInput,
        description: 'The request data (stringified JSON of Hoppscotch request object)',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, input_type_args_1.CreateTeamRequestInput]),
    __metadata("design:returntype", Promise)
], TeamRequestResolver.prototype, "createRequestInCollection", null);
__decorate([
    (0, graphql_1.Mutation)(() => team_request_model_1.TeamRequest, {
        description: 'Update a request with the given ID',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_request_team_member_guard_1.GqlRequestTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.OWNER),
    __param(0, (0, graphql_1.Args)({
        name: 'requestID',
        description: 'ID of the request',
        type: () => graphql_1.ID,
    })),
    __param(1, (0, graphql_1.Args)({
        name: 'data',
        type: () => input_type_args_1.UpdateTeamRequestInput,
        description: 'The updated request data (stringified JSON of Hoppscotch request object)',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, input_type_args_1.UpdateTeamRequestInput]),
    __metadata("design:returntype", Promise)
], TeamRequestResolver.prototype, "updateRequest", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Delete a request with the given ID',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_request_team_member_guard_1.GqlRequestTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.OWNER),
    __param(0, (0, graphql_1.Args)({
        name: 'requestID',
        description: 'ID of the request',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamRequestResolver.prototype, "deleteRequest", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Update the order of requests in the lookup table',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_request_team_member_guard_1.GqlRequestTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.OWNER),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_type_args_1.UpdateLookUpRequestOrderArgs]),
    __metadata("design:returntype", Promise)
], TeamRequestResolver.prototype, "updateLookUpRequestOrder", null);
__decorate([
    (0, graphql_1.Mutation)(() => team_request_model_1.TeamRequest, {
        description: 'Move a request to the given collection',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_request_team_member_guard_1.GqlRequestTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.OWNER),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_type_args_1.MoveTeamRequestArgs]),
    __metadata("design:returntype", Promise)
], TeamRequestResolver.prototype, "moveRequest", null);
__decorate([
    (0, graphql_1.Subscription)(() => team_request_model_1.TeamRequest, {
        description: 'Emits when a new request is added to a team',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.VIEWER, team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.OWNER),
    __param(0, (0, graphql_1.Args)({
        name: 'teamID',
        description: 'ID of the team to listen to',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeamRequestResolver.prototype, "teamRequestAdded", null);
__decorate([
    (0, graphql_1.Subscription)(() => team_request_model_1.TeamRequest, {
        description: 'Emitted when a request has been updated',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.VIEWER, team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.OWNER),
    __param(0, (0, graphql_1.Args)({
        name: 'teamID',
        description: 'ID of the team to listen to',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeamRequestResolver.prototype, "teamRequestUpdated", null);
__decorate([
    (0, graphql_1.Subscription)(() => graphql_1.ID, {
        description: 'Emitted when a request has been deleted. Only the id of the request is emitted.',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.VIEWER, team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.OWNER),
    __param(0, (0, graphql_1.Args)({
        name: 'teamID',
        description: 'ID of the team to listen to',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeamRequestResolver.prototype, "teamRequestDeleted", null);
__decorate([
    (0, graphql_1.Subscription)(() => team_request_model_1.RequestReorderData, {
        description: 'Emitted when a requests position has been changed in its collection',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.VIEWER, team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.OWNER),
    __param(0, (0, graphql_1.Args)({
        name: 'teamID',
        description: 'ID of the team to listen to',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeamRequestResolver.prototype, "requestOrderUpdated", null);
__decorate([
    (0, graphql_1.Subscription)(() => team_request_model_1.TeamRequest, {
        description: 'Emitted when a request has been moved from one collection into another',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.VIEWER, team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.OWNER),
    __param(0, (0, graphql_1.Args)({
        name: 'teamID',
        description: 'ID of the team to listen to',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeamRequestResolver.prototype, "requestMoved", null);
TeamRequestResolver = __decorate([
    (0, common_1.UseGuards)(gql_throttler_guard_1.GqlThrottlerGuard),
    (0, graphql_1.Resolver)(() => team_request_model_1.TeamRequest),
    __metadata("design:paramtypes", [team_request_service_1.TeamRequestService,
        pubsub_service_1.PubSubService])
], TeamRequestResolver);
exports.TeamRequestResolver = TeamRequestResolver;
//# sourceMappingURL=team-request.resolver.js.map