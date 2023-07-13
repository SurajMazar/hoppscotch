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
exports.RequestReorderData = exports.TeamRequest = void 0;
const graphql_1 = require("@nestjs/graphql");
let TeamRequest = class TeamRequest {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the request',
    }),
    __metadata("design:type", String)
], TeamRequest.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the collection the request belongs to.',
    }),
    __metadata("design:type", String)
], TeamRequest.prototype, "collectionID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the team the request belongs to.',
    }),
    __metadata("design:type", String)
], TeamRequest.prototype, "teamID", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'JSON string representing the request data',
    }),
    __metadata("design:type", String)
], TeamRequest.prototype, "request", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Displayed title of the request',
    }),
    __metadata("design:type", String)
], TeamRequest.prototype, "title", void 0);
TeamRequest = __decorate([
    (0, graphql_1.ObjectType)()
], TeamRequest);
exports.TeamRequest = TeamRequest;
let RequestReorderData = class RequestReorderData {
};
__decorate([
    (0, graphql_1.Field)({
        description: 'Team Request being moved',
    }),
    __metadata("design:type", TeamRequest)
], RequestReorderData.prototype, "request", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Team Request succeeding the request being moved in its new position',
        nullable: true,
    }),
    __metadata("design:type", TeamRequest)
], RequestReorderData.prototype, "nextRequest", void 0);
RequestReorderData = __decorate([
    (0, graphql_1.ObjectType)()
], RequestReorderData);
exports.RequestReorderData = RequestReorderData;
//# sourceMappingURL=team-request.model.js.map