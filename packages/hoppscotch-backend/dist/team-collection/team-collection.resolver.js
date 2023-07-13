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
exports.TeamCollectionResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const team_collection_model_1 = require("./team-collection.model");
const team_model_1 = require("../team/team.model");
const team_collection_service_1 = require("./team-collection.service");
const gql_auth_guard_1 = require("../guards/gql-auth.guard");
const gql_team_member_guard_1 = require("../team/guards/gql-team-member.guard");
const common_1 = require("@nestjs/common");
const requires_team_role_decorator_1 = require("../team/decorators/requires-team-role.decorator");
const gql_collection_team_member_guard_1 = require("./guards/gql-collection-team-member.guard");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const input_types_args_1 = require("../types/input-types.args");
const input_type_args_1 = require("./input-type.args");
const E = require("fp-ts/Either");
const utils_1 = require("../utils");
const gql_throttler_guard_1 = require("../guards/gql-throttler.guard");
const throttler_1 = require("@nestjs/throttler");
let TeamCollectionResolver = class TeamCollectionResolver {
    constructor(teamCollectionService, pubsub) {
        this.teamCollectionService = teamCollectionService;
        this.pubsub = pubsub;
    }
    async team(collection) {
        const team = await this.teamCollectionService.getTeamOfCollection(collection.id);
        if (E.isLeft(team))
            (0, utils_1.throwErr)(team.left);
        return team.right;
    }
    async parent(collection) {
        return this.teamCollectionService.getParentOfCollection(collection.id);
    }
    async children(collection, args) {
        return this.teamCollectionService.getChildrenOfCollection(collection.id, args.cursor, args.take);
    }
    async exportCollectionsToJSON(teamID) {
        const jsonString = await this.teamCollectionService.exportCollectionsToJSON(teamID);
        if (E.isLeft(jsonString))
            (0, utils_1.throwErr)(jsonString.left);
        return jsonString.right;
    }
    async rootCollectionsOfTeam(args) {
        return this.teamCollectionService.getTeamRootCollections(args.teamID, args.cursor, args.take);
    }
    async collection(collectionID) {
        const teamCollections = await this.teamCollectionService.getCollection(collectionID);
        if (E.isLeft(teamCollections))
            (0, utils_1.throwErr)(teamCollections.left);
        return teamCollections.right;
    }
    async createRootCollection(args) {
        const teamCollection = await this.teamCollectionService.createCollection(args.teamID, args.title, null);
        if (E.isLeft(teamCollection))
            (0, utils_1.throwErr)(teamCollection.left);
        return teamCollection.right;
    }
    async importCollectionsFromJSON(teamID, jsonString, parentCollectionID) {
        const importedCollection = await this.teamCollectionService.importCollectionsFromJSON(jsonString, teamID, parentCollectionID !== null && parentCollectionID !== void 0 ? parentCollectionID : null);
        if (E.isLeft(importedCollection))
            (0, utils_1.throwErr)(importedCollection.left);
        return importedCollection.right;
    }
    async replaceCollectionsWithJSON(args) {
        var _a;
        const teamCollection = await this.teamCollectionService.replaceCollectionsWithJSON(args.jsonString, args.teamID, (_a = args.parentCollectionID) !== null && _a !== void 0 ? _a : null);
        if (E.isLeft(teamCollection))
            (0, utils_1.throwErr)(teamCollection.left);
        return teamCollection.right;
    }
    async createChildCollection(args) {
        const team = await this.teamCollectionService.getTeamOfCollection(args.collectionID);
        if (E.isLeft(team))
            (0, utils_1.throwErr)(team.left);
        const teamCollection = await this.teamCollectionService.createCollection(team.right.id, args.childTitle, args.collectionID);
        if (E.isLeft(teamCollection))
            (0, utils_1.throwErr)(teamCollection.left);
        return teamCollection.right;
    }
    async renameCollection(args) {
        const updatedTeamCollection = await this.teamCollectionService.renameCollection(args.collectionID, args.newTitle);
        if (E.isLeft(updatedTeamCollection))
            (0, utils_1.throwErr)(updatedTeamCollection.left);
        return updatedTeamCollection.right;
    }
    async deleteCollection(collectionID) {
        const result = await this.teamCollectionService.deleteCollection(collectionID);
        if (E.isLeft(result))
            (0, utils_1.throwErr)(result.left);
        return result.right;
    }
    async moveCollection(args) {
        const res = await this.teamCollectionService.moveCollection(args.collectionID, args.parentCollectionID);
        if (E.isLeft(res))
            (0, utils_1.throwErr)(res.left);
        return res.right;
    }
    async updateCollectionOrder(args) {
        const request = await this.teamCollectionService.updateCollectionOrder(args.collectionID, args.destCollID);
        if (E.isLeft(request))
            (0, utils_1.throwErr)(request.left);
        return request.right;
    }
    teamCollectionAdded(teamID) {
        return this.pubsub.asyncIterator(`team_coll/${teamID}/coll_added`);
    }
    teamCollectionUpdated(teamID) {
        return this.pubsub.asyncIterator(`team_coll/${teamID}/coll_updated`);
    }
    teamCollectionRemoved(teamID) {
        return this.pubsub.asyncIterator(`team_coll/${teamID}/coll_removed`);
    }
    teamCollectionMoved(teamID) {
        return this.pubsub.asyncIterator(`team_coll/${teamID}/coll_moved`);
    }
    collectionOrderUpdated(teamID) {
        return this.pubsub.asyncIterator(`team_coll/${teamID}/coll_order_updated`);
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => team_model_1.Team, {
        description: 'Team the collection belongs to',
        complexity: 5,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_collection_model_1.TeamCollection]),
    __metadata("design:returntype", Promise)
], TeamCollectionResolver.prototype, "team", null);
__decorate([
    (0, graphql_1.ResolveField)(() => team_collection_model_1.TeamCollection, {
        description: 'Return the parent Team Collection (null if root )',
        nullable: true,
        complexity: 3,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_collection_model_1.TeamCollection]),
    __metadata("design:returntype", Promise)
], TeamCollectionResolver.prototype, "parent", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [team_collection_model_1.TeamCollection], {
        description: 'List of children Team Collections',
        complexity: 3,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_collection_model_1.TeamCollection,
        input_types_args_1.PaginationArgs]),
    __metadata("design:returntype", Promise)
], TeamCollectionResolver.prototype, "children", null);
__decorate([
    (0, graphql_1.Query)(() => String, {
        description: 'Returns the JSON string giving the collections and their contents of the team',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.VIEWER, team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.OWNER),
    __param(0, (0, graphql_1.Args)({ name: 'teamID', description: 'ID of the team', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamCollectionResolver.prototype, "exportCollectionsToJSON", null);
__decorate([
    (0, graphql_1.Query)(() => [team_collection_model_1.TeamCollection], {
        description: 'Returns the collections of a team',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.VIEWER, team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.OWNER),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_type_args_1.GetRootTeamCollectionsArgs]),
    __metadata("design:returntype", Promise)
], TeamCollectionResolver.prototype, "rootCollectionsOfTeam", null);
__decorate([
    (0, graphql_1.Query)(() => team_collection_model_1.TeamCollection, {
        description: 'Get a Team Collection with ID or null (if not exists)',
        nullable: true,
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_collection_team_member_guard_1.GqlCollectionTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.VIEWER, team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.OWNER),
    __param(0, (0, graphql_1.Args)({
        name: 'collectionID',
        description: 'ID of the collection',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamCollectionResolver.prototype, "collection", null);
__decorate([
    (0, graphql_1.Mutation)(() => team_collection_model_1.TeamCollection, {
        description: 'Creates a collection at the root of the team hierarchy (no parent collection)',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.EDITOR),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_type_args_1.CreateRootTeamCollectionArgs]),
    __metadata("design:returntype", Promise)
], TeamCollectionResolver.prototype, "createRootCollection", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Import collections from JSON string to the specified Team',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.EDITOR),
    __param(0, (0, graphql_1.Args)({
        name: 'teamID',
        type: () => graphql_1.ID,
        description: 'Id of the team to add to',
    })),
    __param(1, (0, graphql_1.Args)({
        name: 'jsonString',
        description: 'JSON string to import',
    })),
    __param(2, (0, graphql_1.Args)({
        name: 'parentCollectionID',
        type: () => graphql_1.ID,
        description: 'ID to the collection to which to import to (null if to import to the root of team)',
        nullable: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TeamCollectionResolver.prototype, "importCollectionsFromJSON", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Replace existing collections of a specific team with collections in JSON string',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.EDITOR),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_type_args_1.ReplaceTeamCollectionArgs]),
    __metadata("design:returntype", Promise)
], TeamCollectionResolver.prototype, "replaceCollectionsWithJSON", null);
__decorate([
    (0, graphql_1.Mutation)(() => team_collection_model_1.TeamCollection, {
        description: 'Create a collection that has a parent collection',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_collection_team_member_guard_1.GqlCollectionTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.EDITOR),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_type_args_1.CreateChildTeamCollectionArgs]),
    __metadata("design:returntype", Promise)
], TeamCollectionResolver.prototype, "createChildCollection", null);
__decorate([
    (0, graphql_1.Mutation)(() => team_collection_model_1.TeamCollection, {
        description: 'Rename a collection',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_collection_team_member_guard_1.GqlCollectionTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.EDITOR),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_type_args_1.RenameTeamCollectionArgs]),
    __metadata("design:returntype", Promise)
], TeamCollectionResolver.prototype, "renameCollection", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Delete a collection',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_collection_team_member_guard_1.GqlCollectionTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.EDITOR),
    __param(0, (0, graphql_1.Args)({
        name: 'collectionID',
        description: 'ID of the collection',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamCollectionResolver.prototype, "deleteCollection", null);
__decorate([
    (0, graphql_1.Mutation)(() => team_collection_model_1.TeamCollection, {
        description: 'Move a collection into a new parent collection or the root of the team',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_collection_team_member_guard_1.GqlCollectionTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.EDITOR),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_type_args_1.MoveTeamCollectionArgs]),
    __metadata("design:returntype", Promise)
], TeamCollectionResolver.prototype, "moveCollection", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Update the order of collections',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_collection_team_member_guard_1.GqlCollectionTeamMemberGuard),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.EDITOR),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_type_args_1.UpdateTeamCollectionOrderArgs]),
    __metadata("design:returntype", Promise)
], TeamCollectionResolver.prototype, "updateCollectionOrder", null);
__decorate([
    (0, graphql_1.Subscription)(() => team_collection_model_1.TeamCollection, {
        description: 'Listen to when a collection has been added to a team. The emitted value is the team added',
        resolve: (value) => value,
    }),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.VIEWER),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    __param(0, (0, graphql_1.Args)({
        name: 'teamID',
        description: 'ID of the team to listen to',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeamCollectionResolver.prototype, "teamCollectionAdded", null);
__decorate([
    (0, graphql_1.Subscription)(() => team_collection_model_1.TeamCollection, {
        description: 'Listen to when a collection has been updated.',
        resolve: (value) => value,
    }),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.VIEWER),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    __param(0, (0, graphql_1.Args)({
        name: 'teamID',
        description: 'ID of the team to listen to',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeamCollectionResolver.prototype, "teamCollectionUpdated", null);
__decorate([
    (0, graphql_1.Subscription)(() => graphql_1.ID, {
        description: 'Listen to when a collection has been removed',
        resolve: (value) => value,
    }),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.VIEWER),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    __param(0, (0, graphql_1.Args)({
        name: 'teamID',
        description: 'ID of the team to listen to',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeamCollectionResolver.prototype, "teamCollectionRemoved", null);
__decorate([
    (0, graphql_1.Subscription)(() => team_collection_model_1.TeamCollection, {
        description: 'Listen to when a collection has been moved',
        resolve: (value) => value,
    }),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.VIEWER),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    __param(0, (0, graphql_1.Args)({
        name: 'teamID',
        description: 'ID of the team to listen to',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeamCollectionResolver.prototype, "teamCollectionMoved", null);
__decorate([
    (0, graphql_1.Subscription)(() => team_collection_model_1.CollectionReorderData, {
        description: 'Listen to when a collections position has changed',
        resolve: (value) => value,
    }),
    (0, requires_team_role_decorator_1.RequiresTeamRole)(team_model_1.TeamMemberRole.OWNER, team_model_1.TeamMemberRole.EDITOR, team_model_1.TeamMemberRole.VIEWER),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, gql_team_member_guard_1.GqlTeamMemberGuard),
    __param(0, (0, graphql_1.Args)({
        name: 'teamID',
        description: 'ID of the team to listen to',
        type: () => graphql_1.ID,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeamCollectionResolver.prototype, "collectionOrderUpdated", null);
TeamCollectionResolver = __decorate([
    (0, common_1.UseGuards)(gql_throttler_guard_1.GqlThrottlerGuard),
    (0, graphql_1.Resolver)(() => team_collection_model_1.TeamCollection),
    __metadata("design:paramtypes", [team_collection_service_1.TeamCollectionService,
        pubsub_service_1.PubSubService])
], TeamCollectionResolver);
exports.TeamCollectionResolver = TeamCollectionResolver;
//# sourceMappingURL=team-collection.resolver.js.map