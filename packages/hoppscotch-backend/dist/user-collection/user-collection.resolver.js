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
exports.UserCollectionResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const gql_user_decorator_1 = require("../decorators/gql-user.decorator");
const gql_auth_guard_1 = require("../guards/gql-auth.guard");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const user_collection_service_1 = require("./user-collection.service");
const user_collections_model_1 = require("./user-collections.model");
const utils_1 = require("../utils");
const user_model_1 = require("../user/user.model");
const input_types_args_1 = require("../types/input-types.args");
const input_type_args_1 = require("./input-type.args");
const RequestTypes_1 = require("../types/RequestTypes");
const E = require("fp-ts/Either");
const gql_throttler_guard_1 = require("../guards/gql-throttler.guard");
const throttler_1 = require("@nestjs/throttler");
let UserCollectionResolver = class UserCollectionResolver {
    constructor(userCollectionService, pubSub) {
        this.userCollectionService = userCollectionService;
        this.pubSub = pubSub;
    }
    async user(user) {
        return user;
    }
    async parent(collection) {
        return this.userCollectionService.getParentOfUserCollection(collection.id);
    }
    childrenREST(collection, args) {
        return this.userCollectionService.getChildrenOfUserCollection(collection.id, args.cursor, args.take, RequestTypes_1.ReqType.REST);
    }
    childrenGQL(collection, args) {
        return this.userCollectionService.getChildrenOfUserCollection(collection.id, args.cursor, args.take, RequestTypes_1.ReqType.GQL);
    }
    rootRESTUserCollections(user, args) {
        return this.userCollectionService.getUserRootCollections(user, args.cursor, args.take, RequestTypes_1.ReqType.REST);
    }
    rootGQLUserCollections(user, args) {
        return this.userCollectionService.getUserRootCollections(user, args.cursor, args.take, RequestTypes_1.ReqType.GQL);
    }
    async userCollection(userCollectionID) {
        const userCollection = await this.userCollectionService.getUserCollection(userCollectionID);
        if (E.isLeft(userCollection))
            (0, utils_1.throwErr)(userCollection.left);
        return userCollection.right;
    }
    async exportUserCollectionsToJSON(user, collectionID, collectionType) {
        const jsonString = await this.userCollectionService.exportUserCollectionsToJSON(user.uid, collectionID, collectionType);
        if (E.isLeft(jsonString))
            (0, utils_1.throwErr)(jsonString.left);
        return jsonString.right;
    }
    async createRESTRootUserCollection(user, args) {
        const userCollection = await this.userCollectionService.createUserCollection(user, args.title, null, RequestTypes_1.ReqType.REST);
        if (E.isLeft(userCollection))
            (0, utils_1.throwErr)(userCollection.left);
        return userCollection.right;
    }
    async createGQLRootUserCollection(user, args) {
        const userCollection = await this.userCollectionService.createUserCollection(user, args.title, null, RequestTypes_1.ReqType.GQL);
        if (E.isLeft(userCollection))
            (0, utils_1.throwErr)(userCollection.left);
        return userCollection.right;
    }
    async createGQLChildUserCollection(user, args) {
        const userCollection = await this.userCollectionService.createUserCollection(user, args.title, args.parentUserCollectionID, RequestTypes_1.ReqType.GQL);
        if (E.isLeft(userCollection))
            (0, utils_1.throwErr)(userCollection.left);
        return userCollection.right;
    }
    async createRESTChildUserCollection(user, args) {
        const userCollection = await this.userCollectionService.createUserCollection(user, args.title, args.parentUserCollectionID, RequestTypes_1.ReqType.REST);
        if (E.isLeft(userCollection))
            (0, utils_1.throwErr)(userCollection.left);
        return userCollection.right;
    }
    async renameUserCollection(user, args) {
        const updatedUserCollection = await this.userCollectionService.renameUserCollection(args.newTitle, args.userCollectionID, user.uid);
        if (E.isLeft(updatedUserCollection))
            (0, utils_1.throwErr)(updatedUserCollection.left);
        return updatedUserCollection.right;
    }
    async deleteUserCollection(userCollectionID, user) {
        const result = await this.userCollectionService.deleteUserCollection(userCollectionID, user.uid);
        if (E.isLeft(result))
            (0, utils_1.throwErr)(result.left);
        return result.right;
    }
    async moveUserCollection(args, user) {
        const res = await this.userCollectionService.moveUserCollection(args.userCollectionID, args.destCollectionID, user.uid);
        if (E.isLeft(res)) {
            (0, utils_1.throwErr)(res.left);
        }
        return res.right;
    }
    async updateUserCollectionOrder(args, user) {
        const res = await this.userCollectionService.updateUserCollectionOrder(args.collectionID, args.nextCollectionID, user.uid);
        if (E.isLeft(res)) {
            (0, utils_1.throwErr)(res.left);
        }
        return res.right;
    }
    async importUserCollectionsFromJSON(args, user) {
        const importedCollection = await this.userCollectionService.importCollectionsFromJSON(args.jsonString, user.uid, args.parentCollectionID, args.reqType);
        if (E.isLeft(importedCollection))
            (0, utils_1.throwErr)(importedCollection.left);
        return importedCollection.right;
    }
    userCollectionCreated(user) {
        return this.pubSub.asyncIterator(`user_coll/${user.uid}/created`);
    }
    userCollectionUpdated(user) {
        return this.pubSub.asyncIterator(`user_coll/${user.uid}/updated`);
    }
    userCollectionRemoved(user) {
        return this.pubSub.asyncIterator(`user_coll/${user.uid}/deleted`);
    }
    userCollectionMoved(user) {
        return this.pubSub.asyncIterator(`user_coll/${user.uid}/moved`);
    }
    userCollectionOrderUpdated(user) {
        return this.pubSub.asyncIterator(`user_coll/${user.uid}/order_updated`);
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => user_model_1.User, {
        description: 'User the collection belongs to',
    }),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserCollectionResolver.prototype, "user", null);
__decorate([
    (0, graphql_1.ResolveField)(() => user_collections_model_1.UserCollection, {
        description: 'Parent user collection (null if root)',
        nullable: true,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_collections_model_1.UserCollection]),
    __metadata("design:returntype", Promise)
], UserCollectionResolver.prototype, "parent", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [user_collections_model_1.UserCollection], {
        description: 'List of children REST user collection',
        complexity: 3,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_collections_model_1.UserCollection,
        input_types_args_1.PaginationArgs]),
    __metadata("design:returntype", void 0)
], UserCollectionResolver.prototype, "childrenREST", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [user_collections_model_1.UserCollection], {
        description: 'List of children GraphQL user collection',
        complexity: 3,
    }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_collections_model_1.UserCollection,
        input_types_args_1.PaginationArgs]),
    __metadata("design:returntype", void 0)
], UserCollectionResolver.prototype, "childrenGQL", null);
__decorate([
    (0, graphql_1.Query)(() => [user_collections_model_1.UserCollection], {
        description: 'Get the root REST user collections for a user',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, input_types_args_1.PaginationArgs]),
    __metadata("design:returntype", void 0)
], UserCollectionResolver.prototype, "rootRESTUserCollections", null);
__decorate([
    (0, graphql_1.Query)(() => [user_collections_model_1.UserCollection], {
        description: 'Get the root GraphQL user collections for a user',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, input_types_args_1.PaginationArgs]),
    __metadata("design:returntype", void 0)
], UserCollectionResolver.prototype, "rootGQLUserCollections", null);
__decorate([
    (0, graphql_1.Query)(() => user_collections_model_1.UserCollection, {
        description: 'Get user collection with ID',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)({
        type: () => graphql_1.ID,
        name: 'userCollectionID',
        description: 'ID of the user collection',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserCollectionResolver.prototype, "userCollection", null);
__decorate([
    (0, graphql_1.Query)(() => user_collections_model_1.UserCollectionExportJSONData, {
        description: 'Returns the JSON string giving the collections and their contents of a user',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)({
        type: () => graphql_1.ID,
        name: 'collectionID',
        description: 'ID of the user collection',
        nullable: true,
        defaultValue: null,
    })),
    __param(2, (0, graphql_1.Args)({
        type: () => RequestTypes_1.ReqType,
        name: 'collectionType',
        description: 'Type of the user collection',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], UserCollectionResolver.prototype, "exportUserCollectionsToJSON", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_collections_model_1.UserCollection, {
        description: 'Creates root REST user collection(no parent user collection)',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, input_type_args_1.CreateRootUserCollectionArgs]),
    __metadata("design:returntype", Promise)
], UserCollectionResolver.prototype, "createRESTRootUserCollection", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_collections_model_1.UserCollection, {
        description: 'Creates root GraphQL user collection(no parent user collection)',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, input_type_args_1.CreateRootUserCollectionArgs]),
    __metadata("design:returntype", Promise)
], UserCollectionResolver.prototype, "createGQLRootUserCollection", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_collections_model_1.UserCollection, {
        description: 'Creates a new child GraphQL user collection',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, input_type_args_1.CreateChildUserCollectionArgs]),
    __metadata("design:returntype", Promise)
], UserCollectionResolver.prototype, "createGQLChildUserCollection", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_collections_model_1.UserCollection, {
        description: 'Creates a new child REST user collection',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, input_type_args_1.CreateChildUserCollectionArgs]),
    __metadata("design:returntype", Promise)
], UserCollectionResolver.prototype, "createRESTChildUserCollection", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_collections_model_1.UserCollection, {
        description: 'Rename a user collection',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, input_type_args_1.RenameUserCollectionsArgs]),
    __metadata("design:returntype", Promise)
], UserCollectionResolver.prototype, "renameUserCollection", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Delete a user collection',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)({
        name: 'userCollectionID',
        description: 'ID of the user collection',
        type: () => graphql_1.ID,
    })),
    __param(1, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserCollectionResolver.prototype, "deleteUserCollection", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_collections_model_1.UserCollection, {
        description: 'Move user collection into new parent or root',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_type_args_1.MoveUserCollectionArgs, Object]),
    __metadata("design:returntype", Promise)
], UserCollectionResolver.prototype, "moveUserCollection", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Update the order of UserCollections inside parent collection or in root',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_type_args_1.UpdateUserCollectionArgs, Object]),
    __metadata("design:returntype", Promise)
], UserCollectionResolver.prototype, "updateUserCollectionOrder", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Import collections from JSON string to the specified Team',
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_type_args_1.ImportUserCollectionsFromJSONArgs, Object]),
    __metadata("design:returntype", Promise)
], UserCollectionResolver.prototype, "importUserCollectionsFromJSON", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_collections_model_1.UserCollection, {
        description: 'Listen for User Collection Creation',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserCollectionResolver.prototype, "userCollectionCreated", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_collections_model_1.UserCollection, {
        description: 'Listen to when a User Collection has been updated.',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserCollectionResolver.prototype, "userCollectionUpdated", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_collections_model_1.UserCollectionRemovedData, {
        description: 'Listen to when a User Collection has been deleted',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserCollectionResolver.prototype, "userCollectionRemoved", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_collections_model_1.UserCollection, {
        description: 'Listen to when a User Collection has been moved',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserCollectionResolver.prototype, "userCollectionMoved", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_collections_model_1.UserCollectionReorderData, {
        description: 'Listen to when a User Collections position has changed',
        resolve: (value) => value,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserCollectionResolver.prototype, "userCollectionOrderUpdated", null);
UserCollectionResolver = __decorate([
    (0, common_1.UseGuards)(gql_throttler_guard_1.GqlThrottlerGuard),
    (0, graphql_1.Resolver)(() => user_collections_model_1.UserCollection),
    __metadata("design:paramtypes", [user_collection_service_1.UserCollectionService,
        pubsub_service_1.PubSubService])
], UserCollectionResolver);
exports.UserCollectionResolver = UserCollectionResolver;
//# sourceMappingURL=user-collection.resolver.js.map