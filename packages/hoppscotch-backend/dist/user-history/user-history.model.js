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
exports.UserHistoryDeletedManyData = exports.UserHistory = void 0;
const graphql_1 = require("@nestjs/graphql");
const RequestTypes_1 = require("../types/RequestTypes");
let UserHistory = class UserHistory {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the user request in history',
    }),
    __metadata("design:type", String)
], UserHistory.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the user this history belongs to',
    }),
    __metadata("design:type", String)
], UserHistory.prototype, "userUid", void 0);
__decorate([
    (0, graphql_1.Field)(() => RequestTypes_1.ReqType, {
        description: 'Type of the request in the history',
    }),
    __metadata("design:type", String)
], UserHistory.prototype, "reqType", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'JSON string representing the request data',
    }),
    __metadata("design:type", String)
], UserHistory.prototype, "request", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'JSON string representing the response meta-data',
    }),
    __metadata("design:type", String)
], UserHistory.prototype, "responseMetadata", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'If the request in the history starred',
    }),
    __metadata("design:type", Boolean)
], UserHistory.prototype, "isStarred", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Timestamp of when the request was executed or history was created',
    }),
    __metadata("design:type", Date)
], UserHistory.prototype, "executedOn", void 0);
UserHistory = __decorate([
    (0, graphql_1.ObjectType)()
], UserHistory);
exports.UserHistory = UserHistory;
let UserHistoryDeletedManyData = class UserHistoryDeletedManyData {
};
__decorate([
    (0, graphql_1.Field)(() => Number, {
        description: 'Number of user histories deleted',
    }),
    __metadata("design:type", Number)
], UserHistoryDeletedManyData.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => RequestTypes_1.ReqType, {
        description: 'Type of the request in the history',
    }),
    __metadata("design:type", String)
], UserHistoryDeletedManyData.prototype, "reqType", void 0);
UserHistoryDeletedManyData = __decorate([
    (0, graphql_1.ObjectType)()
], UserHistoryDeletedManyData);
exports.UserHistoryDeletedManyData = UserHistoryDeletedManyData;
(0, graphql_1.registerEnumType)(RequestTypes_1.ReqType, {
    name: 'ReqType',
});
//# sourceMappingURL=user-history.model.js.map