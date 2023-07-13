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
exports.TeamInvitation = void 0;
const graphql_1 = require("@nestjs/graphql");
const team_model_1 = require("../team/team.model");
let TeamInvitation = class TeamInvitation {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the invite',
    }),
    __metadata("design:type", String)
], TeamInvitation.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the team the invite is to',
    }),
    __metadata("design:type", String)
], TeamInvitation.prototype, "teamID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'UID of the creator of the invite',
    }),
    __metadata("design:type", String)
], TeamInvitation.prototype, "creatorUid", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Email of the invitee',
    }),
    __metadata("design:type", String)
], TeamInvitation.prototype, "inviteeEmail", void 0);
__decorate([
    (0, graphql_1.Field)(() => team_model_1.TeamMemberRole, {
        description: 'The role that will be given to the invitee',
    }),
    __metadata("design:type", String)
], TeamInvitation.prototype, "inviteeRole", void 0);
TeamInvitation = __decorate([
    (0, graphql_1.ObjectType)()
], TeamInvitation);
exports.TeamInvitation = TeamInvitation;
//# sourceMappingURL=team-invitation.model.js.map