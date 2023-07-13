"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamInvitationModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_module_1 = require("../mailer/mailer.module");
const prisma_module_1 = require("../prisma/prisma.module");
const pubsub_module_1 = require("../pubsub/pubsub.module");
const team_module_1 = require("../team/team.module");
const user_module_1 = require("../user/user.module");
const team_invitation_resolver_1 = require("./team-invitation.resolver");
const team_invitation_service_1 = require("./team-invitation.service");
const team_invite_team_owner_guard_1 = require("./team-invite-team-owner.guard");
const team_invite_viewer_guard_1 = require("./team-invite-viewer.guard");
const team_invitee_guard_1 = require("./team-invitee.guard");
const team_teaminvite_ext_resolver_1 = require("./team-teaminvite-ext.resolver");
let TeamInvitationModule = class TeamInvitationModule {
};
TeamInvitationModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, team_module_1.TeamModule, pubsub_module_1.PubSubModule, user_module_1.UserModule, mailer_module_1.MailerModule],
        providers: [
            team_invitation_service_1.TeamInvitationService,
            team_invitation_resolver_1.TeamInvitationResolver,
            team_teaminvite_ext_resolver_1.TeamTeamInviteExtResolver,
            team_invitee_guard_1.TeamInviteeGuard,
            team_invite_viewer_guard_1.TeamInviteViewerGuard,
            team_invite_team_owner_guard_1.TeamInviteTeamOwnerGuard,
        ],
        exports: [team_invitation_service_1.TeamInvitationService],
    })
], TeamInvitationModule);
exports.TeamInvitationModule = TeamInvitationModule;
//# sourceMappingURL=team-invitation.module.js.map