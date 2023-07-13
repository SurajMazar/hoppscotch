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
exports.UpdateUserRequestArgs = exports.CreateUserRequestArgs = exports.MoveUserRequestArgs = exports.GetUserRequestArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
const input_types_args_1 = require("../types/input-types.args");
let GetUserRequestArgs = class GetUserRequestArgs extends input_types_args_1.PaginationArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        nullable: true,
        defaultValue: undefined,
        description: 'Collection ID of the user request',
    }),
    __metadata("design:type", String)
], GetUserRequestArgs.prototype, "collectionID", void 0);
GetUserRequestArgs = __decorate([
    (0, graphql_1.ArgsType)()
], GetUserRequestArgs);
exports.GetUserRequestArgs = GetUserRequestArgs;
let MoveUserRequestArgs = class MoveUserRequestArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the collection, where the request is belongs to',
    }),
    __metadata("design:type", String)
], MoveUserRequestArgs.prototype, "sourceCollectionID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the request being moved',
    }),
    __metadata("design:type", String)
], MoveUserRequestArgs.prototype, "requestID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the collection, where the request is moving to',
    }),
    __metadata("design:type", String)
], MoveUserRequestArgs.prototype, "destinationCollectionID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        nullable: true,
        description: 'ID of the request that comes after the updated request in its new position',
    }),
    __metadata("design:type", String)
], MoveUserRequestArgs.prototype, "nextRequestID", void 0);
MoveUserRequestArgs = __decorate([
    (0, graphql_1.ArgsType)()
], MoveUserRequestArgs);
exports.MoveUserRequestArgs = MoveUserRequestArgs;
let CreateUserRequestArgs = class CreateUserRequestArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'Collection ID of the user request',
    }),
    __metadata("design:type", String)
], CreateUserRequestArgs.prototype, "collectionID", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'Title of the user request' }),
    __metadata("design:type", String)
], CreateUserRequestArgs.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'content/body of the user request' }),
    __metadata("design:type", String)
], CreateUserRequestArgs.prototype, "request", void 0);
CreateUserRequestArgs = __decorate([
    (0, graphql_1.ArgsType)()
], CreateUserRequestArgs);
exports.CreateUserRequestArgs = CreateUserRequestArgs;
let UpdateUserRequestArgs = class UpdateUserRequestArgs {
};
__decorate([
    (0, graphql_1.Field)({
        nullable: true,
        defaultValue: undefined,
        description: 'Title of the user request',
    }),
    __metadata("design:type", String)
], UpdateUserRequestArgs.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({
        nullable: true,
        defaultValue: undefined,
        description: 'content/body of the user request',
    }),
    __metadata("design:type", String)
], UpdateUserRequestArgs.prototype, "request", void 0);
UpdateUserRequestArgs = __decorate([
    (0, graphql_1.ArgsType)()
], UpdateUserRequestArgs);
exports.UpdateUserRequestArgs = UpdateUserRequestArgs;
//# sourceMappingURL=input-type.args.js.map