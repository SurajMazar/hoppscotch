"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_resolver_1 = require("./admin.resolver");
const admin_service_1 = require("./admin.service");
const prisma_module_1 = require("../prisma/prisma.module");
const pubsub_module_1 = require("../pubsub/pubsub.module");
const user_module_1 = require("../user/user.module");
const mailer_module_1 = require("../mailer/mailer.module");
const team_module_1 = require("../team/team.module");
const team_invitation_module_1 = require("../team-invitation/team-invitation.module");
const team_environments_module_1 = require("../team-environments/team-environments.module");
const team_collection_module_1 = require("../team-collection/team-collection.module");
const team_request_module_1 = require("../team-request/team-request.module");
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            pubsub_module_1.PubSubModule,
            user_module_1.UserModule,
            mailer_module_1.MailerModule,
            team_module_1.TeamModule,
            team_invitation_module_1.TeamInvitationModule,
            team_environments_module_1.TeamEnvironmentsModule,
            team_collection_module_1.TeamCollectionModule,
            team_request_module_1.TeamRequestModule,
        ],
        providers: [admin_resolver_1.AdminResolver, admin_service_1.AdminService],
        exports: [admin_service_1.AdminService],
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map