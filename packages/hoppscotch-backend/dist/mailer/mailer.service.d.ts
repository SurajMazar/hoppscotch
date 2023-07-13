import { AdminUserInvitationMailDescription, MailDescription, UserMagicLinkMailDescription } from './MailDescriptions';
import * as TE from 'fp-ts/TaskEither';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
export declare class MailerService {
    private readonly nestMailerService;
    constructor(nestMailerService: NestMailerService);
    private resolveSubjectForMailDesc;
    sendMail(to: string, mailDesc: MailDescription | UserMagicLinkMailDescription): TE.TaskEither<"email/failed", void>;
    sendAuthEmail(to: string, mailDesc: UserMagicLinkMailDescription): Promise<never>;
    sendUserInvitationEmail(to: string, mailDesc: AdminUserInvitationMailDescription): Promise<any>;
}
