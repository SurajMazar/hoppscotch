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
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
const TE = require("fp-ts/TaskEither");
const errors_1 = require("../errors");
const mailer_1 = require("@nestjs-modules/mailer");
let MailerService = class MailerService {
    constructor(nestMailerService) {
        this.nestMailerService = nestMailerService;
    }
    resolveSubjectForMailDesc(mailDesc) {
        switch (mailDesc.template) {
            case 'team-invitation':
                return `${mailDesc.variables.invitee} invited you to join ${mailDesc.variables.invite_team_name} in Hoppscotch`;
            case 'code-your-own':
                return 'Sign in to Hoppscotch';
        }
    }
    sendMail(to, mailDesc) {
        return TE.tryCatch(async () => {
            await this.nestMailerService.sendMail({
                to,
                template: mailDesc.template,
                subject: this.resolveSubjectForMailDesc(mailDesc),
                context: mailDesc.variables,
            });
        }, () => errors_1.EMAIL_FAILED);
    }
    async sendAuthEmail(to, mailDesc) {
        try {
            await this.nestMailerService.sendMail({
                to,
                template: mailDesc.template,
                subject: this.resolveSubjectForMailDesc(mailDesc),
                context: mailDesc.variables,
            });
        }
        catch (error) {
            return (0, utils_1.throwErr)(errors_1.EMAIL_FAILED);
        }
    }
    async sendUserInvitationEmail(to, mailDesc) {
        try {
            const res = await this.nestMailerService.sendMail({
                to,
                template: mailDesc.template,
                subject: this.resolveSubjectForMailDesc(mailDesc),
                context: mailDesc.variables,
            });
            return res;
        }
        catch (error) {
            return (0, utils_1.throwErr)(errors_1.EMAIL_FAILED);
        }
    }
};
MailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailerService);
exports.MailerService = MailerService;
//# sourceMappingURL=mailer.service.js.map