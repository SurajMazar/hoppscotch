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
exports.ReplaceTeamCollectionArgs = exports.UpdateTeamCollectionOrderArgs = exports.MoveTeamCollectionArgs = exports.RenameTeamCollectionArgs = exports.CreateChildTeamCollectionArgs = exports.CreateRootTeamCollectionArgs = exports.GetRootTeamCollectionsArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
const input_types_args_1 = require("../types/input-types.args");
let GetRootTeamCollectionsArgs = class GetRootTeamCollectionsArgs extends input_types_args_1.PaginationArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { name: 'teamID', description: 'ID of the team' }),
    __metadata("design:type", String)
], GetRootTeamCollectionsArgs.prototype, "teamID", void 0);
GetRootTeamCollectionsArgs = __decorate([
    (0, graphql_1.ArgsType)()
], GetRootTeamCollectionsArgs);
exports.GetRootTeamCollectionsArgs = GetRootTeamCollectionsArgs;
let CreateRootTeamCollectionArgs = class CreateRootTeamCollectionArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { name: 'teamID', description: 'ID of the team' }),
    __metadata("design:type", String)
], CreateRootTeamCollectionArgs.prototype, "teamID", void 0);
__decorate([
    (0, graphql_1.Field)({ name: 'title', description: 'Title of the new collection' }),
    __metadata("design:type", String)
], CreateRootTeamCollectionArgs.prototype, "title", void 0);
CreateRootTeamCollectionArgs = __decorate([
    (0, graphql_1.ArgsType)()
], CreateRootTeamCollectionArgs);
exports.CreateRootTeamCollectionArgs = CreateRootTeamCollectionArgs;
let CreateChildTeamCollectionArgs = class CreateChildTeamCollectionArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        name: 'collectionID',
        description: 'ID of the parent to the new collection',
    }),
    __metadata("design:type", String)
], CreateChildTeamCollectionArgs.prototype, "collectionID", void 0);
__decorate([
    (0, graphql_1.Field)({ name: 'childTitle', description: 'Title of the new collection' }),
    __metadata("design:type", String)
], CreateChildTeamCollectionArgs.prototype, "childTitle", void 0);
CreateChildTeamCollectionArgs = __decorate([
    (0, graphql_1.ArgsType)()
], CreateChildTeamCollectionArgs);
exports.CreateChildTeamCollectionArgs = CreateChildTeamCollectionArgs;
let RenameTeamCollectionArgs = class RenameTeamCollectionArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        name: 'collectionID',
        description: 'ID of the collection',
    }),
    __metadata("design:type", String)
], RenameTeamCollectionArgs.prototype, "collectionID", void 0);
__decorate([
    (0, graphql_1.Field)({
        name: 'newTitle',
        description: 'The updated title of the collection',
    }),
    __metadata("design:type", String)
], RenameTeamCollectionArgs.prototype, "newTitle", void 0);
RenameTeamCollectionArgs = __decorate([
    (0, graphql_1.ArgsType)()
], RenameTeamCollectionArgs);
exports.RenameTeamCollectionArgs = RenameTeamCollectionArgs;
let MoveTeamCollectionArgs = class MoveTeamCollectionArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        name: 'parentCollectionID',
        description: 'ID of the parent to the new collection',
        nullable: true,
    }),
    __metadata("design:type", String)
], MoveTeamCollectionArgs.prototype, "parentCollectionID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        name: 'collectionID',
        description: 'ID of the collection',
    }),
    __metadata("design:type", String)
], MoveTeamCollectionArgs.prototype, "collectionID", void 0);
MoveTeamCollectionArgs = __decorate([
    (0, graphql_1.ArgsType)()
], MoveTeamCollectionArgs);
exports.MoveTeamCollectionArgs = MoveTeamCollectionArgs;
let UpdateTeamCollectionOrderArgs = class UpdateTeamCollectionOrderArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        name: 'collectionID',
        description: 'ID of the collection',
    }),
    __metadata("design:type", String)
], UpdateTeamCollectionOrderArgs.prototype, "collectionID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        name: 'destCollID',
        description: 'ID of the collection that comes after the updated collection in its new position',
        nullable: true,
    }),
    __metadata("design:type", String)
], UpdateTeamCollectionOrderArgs.prototype, "destCollID", void 0);
UpdateTeamCollectionOrderArgs = __decorate([
    (0, graphql_1.ArgsType)()
], UpdateTeamCollectionOrderArgs);
exports.UpdateTeamCollectionOrderArgs = UpdateTeamCollectionOrderArgs;
let ReplaceTeamCollectionArgs = class ReplaceTeamCollectionArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        name: 'teamID',
        description: 'Id of the team to add to',
    }),
    __metadata("design:type", String)
], ReplaceTeamCollectionArgs.prototype, "teamID", void 0);
__decorate([
    (0, graphql_1.Field)({
        name: 'jsonString',
        description: 'JSON string to replace with',
    }),
    __metadata("design:type", String)
], ReplaceTeamCollectionArgs.prototype, "jsonString", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        name: 'parentCollectionID',
        description: 'ID to the collection to which to import to (null if to import to the root of team)',
        nullable: true,
    }),
    __metadata("design:type", String)
], ReplaceTeamCollectionArgs.prototype, "parentCollectionID", void 0);
ReplaceTeamCollectionArgs = __decorate([
    (0, graphql_1.ArgsType)()
], ReplaceTeamCollectionArgs);
exports.ReplaceTeamCollectionArgs = ReplaceTeamCollectionArgs;
//# sourceMappingURL=input-type.args.js.map