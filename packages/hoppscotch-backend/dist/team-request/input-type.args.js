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
exports.GetTeamRequestInCollectionArgs = exports.UpdateLookUpRequestOrderArgs = exports.MoveTeamRequestArgs = exports.SearchTeamRequestArgs = exports.UpdateTeamRequestInput = exports.CreateTeamRequestInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const input_types_args_1 = require("../types/input-types.args");
let CreateTeamRequestInput = class CreateTeamRequestInput {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the team the collection belongs to',
    }),
    __metadata("design:type", String)
], CreateTeamRequestInput.prototype, "teamID", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'JSON string representing the request data',
    }),
    __metadata("design:type", String)
], CreateTeamRequestInput.prototype, "request", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Displayed title of the request',
    }),
    __metadata("design:type", String)
], CreateTeamRequestInput.prototype, "title", void 0);
CreateTeamRequestInput = __decorate([
    (0, graphql_1.InputType)()
], CreateTeamRequestInput);
exports.CreateTeamRequestInput = CreateTeamRequestInput;
let UpdateTeamRequestInput = class UpdateTeamRequestInput {
};
__decorate([
    (0, graphql_1.Field)({
        description: 'JSON string representing the request data',
        nullable: true,
    }),
    __metadata("design:type", String)
], UpdateTeamRequestInput.prototype, "request", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Displayed title of the request',
        nullable: true,
    }),
    __metadata("design:type", String)
], UpdateTeamRequestInput.prototype, "title", void 0);
UpdateTeamRequestInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateTeamRequestInput);
exports.UpdateTeamRequestInput = UpdateTeamRequestInput;
let SearchTeamRequestArgs = class SearchTeamRequestArgs extends input_types_args_1.PaginationArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the team to look in',
    }),
    __metadata("design:type", String)
], SearchTeamRequestArgs.prototype, "teamID", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'The title to search for',
    }),
    __metadata("design:type", String)
], SearchTeamRequestArgs.prototype, "searchTerm", void 0);
SearchTeamRequestArgs = __decorate([
    (0, graphql_1.ArgsType)()
], SearchTeamRequestArgs);
exports.SearchTeamRequestArgs = SearchTeamRequestArgs;
let MoveTeamRequestArgs = class MoveTeamRequestArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        nullable: true,
        defaultValue: undefined,
        description: 'ID of the collection, the request belong to',
    }),
    __metadata("design:type", String)
], MoveTeamRequestArgs.prototype, "srcCollID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the request to move',
    }),
    __metadata("design:type", String)
], MoveTeamRequestArgs.prototype, "requestID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the collection, where the request is moving to',
    }),
    __metadata("design:type", String)
], MoveTeamRequestArgs.prototype, "destCollID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        nullable: true,
        description: 'ID of the request that comes after the updated request in its new position',
    }),
    __metadata("design:type", String)
], MoveTeamRequestArgs.prototype, "nextRequestID", void 0);
MoveTeamRequestArgs = __decorate([
    (0, graphql_1.ArgsType)()
], MoveTeamRequestArgs);
exports.MoveTeamRequestArgs = MoveTeamRequestArgs;
let UpdateLookUpRequestOrderArgs = class UpdateLookUpRequestOrderArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the collection',
    }),
    __metadata("design:type", String)
], UpdateLookUpRequestOrderArgs.prototype, "collectionID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        nullable: true,
        description: 'ID of the request that comes after the updated request in its new position',
    }),
    __metadata("design:type", String)
], UpdateLookUpRequestOrderArgs.prototype, "nextRequestID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the request to move',
    }),
    __metadata("design:type", String)
], UpdateLookUpRequestOrderArgs.prototype, "requestID", void 0);
UpdateLookUpRequestOrderArgs = __decorate([
    (0, graphql_1.ArgsType)()
], UpdateLookUpRequestOrderArgs);
exports.UpdateLookUpRequestOrderArgs = UpdateLookUpRequestOrderArgs;
let GetTeamRequestInCollectionArgs = class GetTeamRequestInCollectionArgs extends input_types_args_1.PaginationArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the collection to look in',
    }),
    __metadata("design:type", String)
], GetTeamRequestInCollectionArgs.prototype, "collectionID", void 0);
GetTeamRequestInCollectionArgs = __decorate([
    (0, graphql_1.ArgsType)()
], GetTeamRequestInCollectionArgs);
exports.GetTeamRequestInCollectionArgs = GetTeamRequestInCollectionArgs;
//# sourceMappingURL=input-type.args.js.map