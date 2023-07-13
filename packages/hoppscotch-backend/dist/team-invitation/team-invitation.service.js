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
exports.TeamInvitationService = void 0;
const common_1 = require("@nestjs/common");
const T = require("fp-ts/Task");
const O = require("fp-ts/Option");
const TO = require("fp-ts/TaskOption");
const TE = require("fp-ts/TaskEither");
const E = require("fp-ts/Either");
const function_1 = require("fp-ts/function");
const prisma_service_1 = require("../prisma/prisma.service");
const team_model_1 = require("../team/team.model");
const team_service_1 = require("../team/team.service");
const errors_1 = require("../errors");
const mailer_service_1 = require("../mailer/mailer.service");
const user_service_1 = require("../user/user.service");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const utils_1 = require("../utils");
let TeamInvitationService = class TeamInvitationService {
    constructor(prisma, userService, teamService, mailerService, pubsub) {
        this.prisma = prisma;
        this.userService = userService;
        this.teamService = teamService;
        this.mailerService = mailerService;
        this.pubsub = pubsub;
        this.getInvitation = this.getInvitation.bind(this);
    }
    getInvitation(inviteID) {
        return (0, function_1.pipe)(() => this.prisma.teamInvitation.findUnique({
            where: {
                id: inviteID,
            },
        }), TO.fromTask, TO.chain((0, function_1.flow)(O.fromNullable, TO.fromOption)), TO.map((x) => x));
    }
    getInvitationWithEmail(email, team) {
        return (0, function_1.pipe)(() => this.prisma.teamInvitation.findUnique({
            where: {
                teamID_inviteeEmail: {
                    inviteeEmail: email,
                    teamID: team.id,
                },
            },
        }), TO.fromTask, TO.chain((0, function_1.flow)(O.fromNullable, TO.fromOption)));
    }
    async getTeamInviteByEmailAndTeamID(inviteeEmail, teamID) {
        const isEmailValid = (0, utils_1.validateEmail)(inviteeEmail);
        if (!isEmailValid)
            return E.left(errors_1.INVALID_EMAIL);
        try {
            const teamInvite = await this.prisma.teamInvitation.findUniqueOrThrow({
                where: {
                    teamID_inviteeEmail: {
                        inviteeEmail: inviteeEmail,
                        teamID: teamID,
                    },
                },
            });
            return E.right(teamInvite);
        }
        catch (e) {
            return E.left(errors_1.TEAM_INVITE_NO_INVITE_FOUND);
        }
    }
    createInvitation(creator, team, inviteeEmail, inviteeRole) {
        return (0, function_1.pipe)(TE.sequenceArray([
            (0, function_1.pipe)(this.teamService.getTeamMemberTE(team.id, creator.uid), TE.map(function_1.constVoid)),
            (0, function_1.pipe)(async () => await this.userService.findUserByEmail(inviteeEmail), TO.foldW(() => TE.right(undefined), (user) => (0, function_1.pipe)(this.teamService.getTeamMemberTE(team.id, user.uid), TE.foldW(() => TE.right(undefined), () => TE.left(errors_1.TEAM_INVITE_ALREADY_MEMBER)))), TE.map(function_1.constVoid)),
            (0, function_1.pipe)(this.getInvitationWithEmail(inviteeEmail, team), TE.fromTaskOption(() => null), TE.swap, TE.map(function_1.constVoid), TE.mapLeft(() => errors_1.TEAM_INVITE_MEMBER_HAS_INVITE)),
        ]), TE.chainTaskK(() => () => this.prisma.teamInvitation.create({
            data: {
                teamID: team.id,
                inviteeEmail,
                inviteeRole,
                creatorUid: creator.uid,
            },
        })), TE.chainFirstTaskK((invitation) => {
            var _a;
            return (0, function_1.pipe)(this.mailerService.sendMail(inviteeEmail, {
                template: 'team-invitation',
                variables: {
                    invitee: (_a = creator.displayName) !== null && _a !== void 0 ? _a : 'A Hoppscotch User',
                    action_url: `${process.env.VITE_BASE_URL}/join-team?id=${invitation.id}`,
                    invite_team_name: team.name,
                },
            }), TE.getOrElseW(() => T.of(undefined)));
        }), TE.chainFirstTaskK((invitation) => TE.fromTask(async () => {
            const inv = {
                id: invitation.id,
                teamID: invitation.teamID,
                creatorUid: invitation.creatorUid,
                inviteeEmail: invitation.inviteeEmail,
                inviteeRole: team_model_1.TeamMemberRole[invitation.inviteeRole],
            };
            this.pubsub.publish(`team/${inv.teamID}/invite_added`, inv);
        })), TE.map((x) => x));
    }
    revokeInvitation(inviteID) {
        return (0, function_1.pipe)(this.getInvitation(inviteID), TE.fromTaskOption(() => errors_1.TEAM_INVITE_NO_INVITE_FOUND), TE.chainTaskK(() => () => this.prisma.teamInvitation.delete({
            where: {
                id: inviteID,
            },
        })), TE.chainFirst((invitation) => TE.fromTask(() => this.pubsub.publish(`team/${invitation.teamID}/invite_removed`, invitation.id))), TE.map(function_1.constVoid));
    }
    getAllInvitationsInTeam(team) {
        return (0, function_1.pipe)(() => this.prisma.teamInvitation.findMany({
            where: {
                teamID: team.id,
            },
        }), T.map((x) => x));
    }
    acceptInvitation(inviteID, acceptedBy) {
        return (0, function_1.pipe)(TE.Do, TE.bindW('invitation', () => (0, function_1.pipe)(this.getInvitation(inviteID), TE.fromTaskOption(() => errors_1.TEAM_INVITE_NO_INVITE_FOUND))), TE.chainFirstW(({ invitation }) => TE.sequenceArray([
            (0, function_1.pipe)(this.teamService.getTeamMemberTE(invitation.teamID, acceptedBy.uid), TE.swap, TE.bimap(() => errors_1.TEAM_INVITE_ALREADY_MEMBER, function_1.constVoid)),
            (0, function_1.pipe)(undefined, TE.fromPredicate((a) => acceptedBy.email === invitation.inviteeEmail, () => errors_1.TEAM_INVITE_EMAIL_DO_NOT_MATCH)),
        ])), TE.bindW('teamMember', ({ invitation }) => (0, function_1.pipe)(TE.tryCatch(() => this.teamService.addMemberToTeam(invitation.teamID, acceptedBy.uid, invitation.inviteeRole), () => errors_1.TEAM_INVITE_ALREADY_MEMBER))), TE.chainFirstW(({ invitation }) => this.revokeInvitation(invitation.id)), TE.map(({ teamMember }) => teamMember));
    }
    async getAllTeamInvitations(teamID) {
        const invitations = await this.prisma.teamInvitation.findMany({
            where: {
                teamID: teamID,
            },
        });
        return invitations;
    }
};
TeamInvitationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService,
        team_service_1.TeamService,
        mailer_service_1.MailerService,
        pubsub_service_1.PubSubService])
], TeamInvitationService);
exports.TeamInvitationService = TeamInvitationService;
//# sourceMappingURL=team-invitation.service.js.map