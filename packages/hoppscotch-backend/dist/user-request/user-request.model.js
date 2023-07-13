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
exports.UserRequestReorderData = exports.UserRequest = void 0;
const graphql_1 = require("@nestjs/graphql");
const RequestTypes_1 = require("../types/RequestTypes");
let UserRequest = class UserRequest {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the user request',
    }),
    __metadata("design:type", String)
], UserRequest.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the parent collection ID',
    }),
    __metadata("design:type", String)
], UserRequest.prototype, "collectionID", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Title of the user request',
    }),
    __metadata("design:type", String)
], UserRequest.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Content/Body of the user request',
    }),
    __metadata("design:type", String)
], UserRequest.prototype, "request", void 0);
__decorate([
    (0, graphql_1.Field)(() => RequestTypes_1.ReqType, {
        description: 'Type (GRAPHQL/REST) of the user request',
    }),
    __metadata("design:type", String)
], UserRequest.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'Date of the user request creation',
    }),
    __metadata("design:type", Date)
], UserRequest.prototype, "createdOn", void 0);
UserRequest = __decorate([
    (0, graphql_1.ObjectType)()
], UserRequest);
exports.UserRequest = UserRequest;
let UserRequestReorderData = class UserRequestReorderData {
};
__decorate([
    (0, graphql_1.Field)({
        description: 'User request being moved',
    }),
    __metadata("design:type", UserRequest)
], UserRequestReorderData.prototype, "request", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'User request succeeding the request being moved in its new position',
        nullable: true,
    }),
    __metadata("design:type", UserRequest)
], UserRequestReorderData.prototype, "nextRequest", void 0);
UserRequestReorderData = __decorate([
    (0, graphql_1.ObjectType)()
], UserRequestReorderData);
exports.UserRequestReorderData = UserRequestReorderData;
//# sourceMappingURL=user-request.model.js.map