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
exports.SessionType = exports.User = void 0;
const graphql_1 = require("@nestjs/graphql");
let User = class User {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'UID of the user',
    }),
    __metadata("design:type", String)
], User.prototype, "uid", void 0);
__decorate([
    (0, graphql_1.Field)({
        nullable: true,
        description: 'Name of the user (if fetched)',
    }),
    __metadata("design:type", String)
], User.prototype, "displayName", void 0);
__decorate([
    (0, graphql_1.Field)({
        nullable: true,
        description: 'Email of the user',
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({
        nullable: true,
        description: 'URL to the profile photo of the user (if fetched)',
    }),
    __metadata("design:type", String)
], User.prototype, "photoURL", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Flag to determine if user is an Admin or not',
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Date when the user account was created',
    }),
    __metadata("design:type", Date)
], User.prototype, "createdOn", void 0);
__decorate([
    (0, graphql_1.Field)({
        nullable: true,
        description: 'Stringified current REST session for logged-in User',
    }),
    __metadata("design:type", String)
], User.prototype, "currentRESTSession", void 0);
__decorate([
    (0, graphql_1.Field)({
        nullable: true,
        description: 'Stringified current GraphQL session for logged-in User',
    }),
    __metadata("design:type", String)
], User.prototype, "currentGQLSession", void 0);
User = __decorate([
    (0, graphql_1.ObjectType)()
], User);
exports.User = User;
var SessionType;
(function (SessionType) {
    SessionType["REST"] = "REST";
    SessionType["GQL"] = "GQL";
})(SessionType = exports.SessionType || (exports.SessionType = {}));
(0, graphql_1.registerEnumType)(SessionType, {
    name: 'SessionType',
});
//# sourceMappingURL=user.model.js.map