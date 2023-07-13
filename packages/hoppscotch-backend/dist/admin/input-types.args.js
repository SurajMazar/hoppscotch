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
exports.AddUserToTeamArgs = exports.ChangeUserRoleInTeamArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
const team_model_1 = require("../team/team.model");
let ChangeUserRoleInTeamArgs = class ChangeUserRoleInTeamArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        name: 'userUID',
        description: 'users UID',
    }),
    __metadata("design:type", String)
], ChangeUserRoleInTeamArgs.prototype, "userUID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        name: 'teamID',
        description: 'team ID',
    }),
    __metadata("design:type", String)
], ChangeUserRoleInTeamArgs.prototype, "teamID", void 0);
__decorate([
    (0, graphql_1.Field)(() => team_model_1.TeamMemberRole, {
        name: 'newRole',
        description: 'updated team role',
    }),
    __metadata("design:type", String)
], ChangeUserRoleInTeamArgs.prototype, "newRole", void 0);
ChangeUserRoleInTeamArgs = __decorate([
    (0, graphql_1.ArgsType)()
], ChangeUserRoleInTeamArgs);
exports.ChangeUserRoleInTeamArgs = ChangeUserRoleInTeamArgs;
let AddUserToTeamArgs = class AddUserToTeamArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        name: 'teamID',
        description: 'team ID',
    }),
    __metadata("design:type", String)
], AddUserToTeamArgs.prototype, "teamID", void 0);
__decorate([
    (0, graphql_1.Field)(() => team_model_1.TeamMemberRole, {
        name: 'role',
        description: 'The role of the user to add in the team',
    }),
    __metadata("design:type", String)
], AddUserToTeamArgs.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)({
        name: 'userEmail',
        description: 'Email of the user to add to team',
    }),
    __metadata("design:type", String)
], AddUserToTeamArgs.prototype, "userEmail", void 0);
AddUserToTeamArgs = __decorate([
    (0, graphql_1.ArgsType)()
], AddUserToTeamArgs);
exports.AddUserToTeamArgs = AddUserToTeamArgs;
//# sourceMappingURL=input-types.args.js.map