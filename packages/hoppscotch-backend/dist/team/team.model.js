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
exports.TeamMemberRole = exports.TeamMember = exports.Team = void 0;
const graphql_1 = require("@nestjs/graphql");
let Team = class Team {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the team',
    }),
    __metadata("design:type", String)
], Team.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Displayed name of the team',
    }),
    __metadata("design:type", String)
], Team.prototype, "name", void 0);
Team = __decorate([
    (0, graphql_1.ObjectType)()
], Team);
exports.Team = Team;
let TeamMember = class TeamMember {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'Membership ID of the Team Member',
    }),
    __metadata("design:type", String)
], TeamMember.prototype, "membershipID", void 0);
__decorate([
    (0, graphql_1.Field)(() => TeamMemberRole, {
        description: 'Role of the given team member in the given team',
    }),
    __metadata("design:type", String)
], TeamMember.prototype, "role", void 0);
TeamMember = __decorate([
    (0, graphql_1.ObjectType)()
], TeamMember);
exports.TeamMember = TeamMember;
var TeamMemberRole;
(function (TeamMemberRole) {
    TeamMemberRole["OWNER"] = "OWNER";
    TeamMemberRole["VIEWER"] = "VIEWER";
    TeamMemberRole["EDITOR"] = "EDITOR";
})(TeamMemberRole = exports.TeamMemberRole || (exports.TeamMemberRole = {}));
(0, graphql_1.registerEnumType)(TeamMemberRole, {
    name: 'TeamMemberRole',
});
//# sourceMappingURL=team.model.js.map