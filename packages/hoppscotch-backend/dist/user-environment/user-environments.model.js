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
exports.UserEnvironment = void 0;
const graphql_1 = require("@nestjs/graphql");
let UserEnvironment = class UserEnvironment {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the User Environment',
    }),
    __metadata("design:type", String)
], UserEnvironment.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the user this environment belongs to',
    }),
    __metadata("design:type", String)
], UserEnvironment.prototype, "userUid", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        nullable: true,
        description: 'Name of the environment',
    }),
    __metadata("design:type", String)
], UserEnvironment.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'All variables present in the environment',
    }),
    __metadata("design:type", String)
], UserEnvironment.prototype, "variables", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Flag to indicate the environment is global or not',
    }),
    __metadata("design:type", Boolean)
], UserEnvironment.prototype, "isGlobal", void 0);
UserEnvironment = __decorate([
    (0, graphql_1.ObjectType)()
], UserEnvironment);
exports.UserEnvironment = UserEnvironment;
//# sourceMappingURL=user-environments.model.js.map