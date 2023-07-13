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
exports.ImportUserCollectionsFromJSONArgs = exports.MoveUserCollectionArgs = exports.UpdateUserCollectionArgs = exports.RenameUserCollectionsArgs = exports.GetUserChildCollectionArgs = exports.CreateChildUserCollectionArgs = exports.CreateRootUserCollectionArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
const RequestTypes_1 = require("../types/RequestTypes");
const input_types_args_1 = require("../types/input-types.args");
let CreateRootUserCollectionArgs = class CreateRootUserCollectionArgs {
};
__decorate([
    (0, graphql_1.Field)({ name: 'title', description: 'Title of the new user collection' }),
    __metadata("design:type", String)
], CreateRootUserCollectionArgs.prototype, "title", void 0);
CreateRootUserCollectionArgs = __decorate([
    (0, graphql_1.ArgsType)()
], CreateRootUserCollectionArgs);
exports.CreateRootUserCollectionArgs = CreateRootUserCollectionArgs;
let CreateChildUserCollectionArgs = class CreateChildUserCollectionArgs {
};
__decorate([
    (0, graphql_1.Field)({ name: 'title', description: 'Title of the new user collection' }),
    __metadata("design:type", String)
], CreateChildUserCollectionArgs.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        name: 'parentUserCollectionID',
        description: 'ID of the parent to the new user collection',
    }),
    __metadata("design:type", String)
], CreateChildUserCollectionArgs.prototype, "parentUserCollectionID", void 0);
CreateChildUserCollectionArgs = __decorate([
    (0, graphql_1.ArgsType)()
], CreateChildUserCollectionArgs);
exports.CreateChildUserCollectionArgs = CreateChildUserCollectionArgs;
let GetUserChildCollectionArgs = class GetUserChildCollectionArgs extends input_types_args_1.PaginationArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        name: 'userCollectionID',
        description: 'ID of the parent to the user collection',
    }),
    __metadata("design:type", String)
], GetUserChildCollectionArgs.prototype, "userCollectionID", void 0);
GetUserChildCollectionArgs = __decorate([
    (0, graphql_1.ArgsType)()
], GetUserChildCollectionArgs);
exports.GetUserChildCollectionArgs = GetUserChildCollectionArgs;
let RenameUserCollectionsArgs = class RenameUserCollectionsArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        name: 'userCollectionID',
        description: 'ID of the user collection',
    }),
    __metadata("design:type", String)
], RenameUserCollectionsArgs.prototype, "userCollectionID", void 0);
__decorate([
    (0, graphql_1.Field)({
        name: 'newTitle',
        description: 'The updated title of the user collection',
    }),
    __metadata("design:type", String)
], RenameUserCollectionsArgs.prototype, "newTitle", void 0);
RenameUserCollectionsArgs = __decorate([
    (0, graphql_1.ArgsType)()
], RenameUserCollectionsArgs);
exports.RenameUserCollectionsArgs = RenameUserCollectionsArgs;
let UpdateUserCollectionArgs = class UpdateUserCollectionArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        name: 'collectionID',
        description: 'ID of collection being moved',
    }),
    __metadata("design:type", String)
], UpdateUserCollectionArgs.prototype, "collectionID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        name: 'nextCollectionID',
        nullable: true,
        description: 'ID of collection being moved',
    }),
    __metadata("design:type", String)
], UpdateUserCollectionArgs.prototype, "nextCollectionID", void 0);
UpdateUserCollectionArgs = __decorate([
    (0, graphql_1.ArgsType)()
], UpdateUserCollectionArgs);
exports.UpdateUserCollectionArgs = UpdateUserCollectionArgs;
let MoveUserCollectionArgs = class MoveUserCollectionArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        name: 'destCollectionID',
        description: 'ID of the parent to the new collection',
        nullable: true,
    }),
    __metadata("design:type", String)
], MoveUserCollectionArgs.prototype, "destCollectionID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        name: 'userCollectionID',
        description: 'ID of the collection',
    }),
    __metadata("design:type", String)
], MoveUserCollectionArgs.prototype, "userCollectionID", void 0);
MoveUserCollectionArgs = __decorate([
    (0, graphql_1.ArgsType)()
], MoveUserCollectionArgs);
exports.MoveUserCollectionArgs = MoveUserCollectionArgs;
let ImportUserCollectionsFromJSONArgs = class ImportUserCollectionsFromJSONArgs {
};
__decorate([
    (0, graphql_1.Field)({
        name: 'jsonString',
        description: 'JSON string to import',
    }),
    __metadata("design:type", String)
], ImportUserCollectionsFromJSONArgs.prototype, "jsonString", void 0);
__decorate([
    (0, graphql_1.Field)(() => RequestTypes_1.ReqType, {
        name: 'reqType',
        description: 'Type of UserCollection',
    }),
    __metadata("design:type", String)
], ImportUserCollectionsFromJSONArgs.prototype, "reqType", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        name: 'parentCollectionID',
        description: 'ID to the collection to which to import into (null if to import into the root of the user)',
        nullable: true,
    }),
    __metadata("design:type", String)
], ImportUserCollectionsFromJSONArgs.prototype, "parentCollectionID", void 0);
ImportUserCollectionsFromJSONArgs = __decorate([
    (0, graphql_1.ArgsType)()
], ImportUserCollectionsFromJSONArgs);
exports.ImportUserCollectionsFromJSONArgs = ImportUserCollectionsFromJSONArgs;
//# sourceMappingURL=input-type.args.js.map