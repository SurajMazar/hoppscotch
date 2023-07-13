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
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
const team_model_1 = require("./team.model");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
const errors_1 = require("../errors");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const function_1 = require("fp-ts/function");
const TE = require("fp-ts/TaskEither");
const TO = require("fp-ts/TaskOption");
const O = require("fp-ts/Option");
const E = require("fp-ts/Either");
const T = require("fp-ts/Task");
const A = require("fp-ts/Array");
const utils_1 = require("../utils");
let TeamService = class TeamService {
    constructor(prisma, userService, pubsub) {
        this.prisma = prisma;
        this.userService = userService;
        this.pubsub = pubsub;
    }
    onModuleInit() {
        this.userService.registerUserDataHandler(this);
    }
    canAllowUserDeletion(user) {
        return (0, function_1.pipe)(this.isUserOwnerRoleInTeams(user.uid), TO.fromTask, TO.chain((isOwner) => (isOwner ? TO.some(errors_1.USER_IS_OWNER) : TO.none)));
    }
    onUserDelete(user) {
        return this.deleteUserFromAllTeams(user.uid);
    }
    async getCountOfUsersWithRoleInTeam(teamID, role) {
        return await this.prisma.teamMember.count({
            where: {
                teamID,
                role,
            },
        });
    }
    async addMemberToTeamWithEmail(teamID, email, role) {
        const user = await this.userService.findUserByEmail(email);
        if (O.isNone(user))
            return E.left(errors_1.USER_NOT_FOUND);
        const teamMember = await this.addMemberToTeam(teamID, user.value.uid, role);
        return E.right(teamMember);
    }
    async addMemberToTeam(teamID, uid, role) {
        const teamMember = await this.prisma.teamMember.create({
            data: {
                userUid: uid,
                team: {
                    connect: {
                        id: teamID,
                    },
                },
                role: role,
            },
        });
        const member = {
            membershipID: teamMember.id,
            userUid: teamMember.userUid,
            role: team_model_1.TeamMemberRole[teamMember.role],
        };
        this.pubsub.publish(`team/${teamID}/member_added`, member);
        return member;
    }
    async deleteTeam(teamID) {
        const team = await this.prisma.team.findUnique({
            where: {
                id: teamID,
            },
        });
        if (!team)
            return E.left(errors_1.TEAM_INVALID_ID);
        await this.prisma.teamMember.deleteMany({
            where: {
                teamID: teamID,
            },
        });
        await this.prisma.team.delete({
            where: {
                id: teamID,
            },
        });
        return E.right(true);
    }
    validateTeamName(title) {
        if (!title || title.length < 6)
            return E.left(errors_1.TEAM_NAME_INVALID);
        return E.right(true);
    }
    async renameTeam(teamID, newName) {
        const isValidTitle = this.validateTeamName(newName);
        if (E.isLeft(isValidTitle))
            return isValidTitle;
        try {
            const updatedTeam = await this.prisma.team.update({
                where: {
                    id: teamID,
                },
                data: {
                    name: newName,
                },
            });
            return E.right(updatedTeam);
        }
        catch (e) {
            return E.left(errors_1.TEAM_INVALID_ID);
        }
    }
    async updateTeamMemberRole(teamID, userUid, newRole) {
        const ownerCount = await this.prisma.teamMember.count({
            where: {
                teamID,
                role: team_model_1.TeamMemberRole.OWNER,
            },
        });
        const member = await this.prisma.teamMember.findUnique({
            where: {
                teamID_userUid: {
                    teamID,
                    userUid,
                },
            },
        });
        if (!member)
            return E.left(errors_1.TEAM_MEMBER_NOT_FOUND);
        if (member.role === team_model_1.TeamMemberRole.OWNER &&
            newRole != team_model_1.TeamMemberRole.OWNER &&
            ownerCount === 1) {
            return E.left(errors_1.TEAM_ONLY_ONE_OWNER);
        }
        const result = await this.prisma.teamMember.update({
            where: {
                teamID_userUid: {
                    teamID,
                    userUid,
                },
            },
            data: {
                role: newRole,
            },
        });
        const updatedMember = {
            membershipID: result.id,
            userUid: result.userUid,
            role: team_model_1.TeamMemberRole[result.role],
        };
        this.pubsub.publish(`team/${teamID}/member_updated`, updatedMember);
        return E.right(updatedMember);
    }
    async leaveTeam(teamID, userUid) {
        const ownerCount = await this.prisma.teamMember.count({
            where: {
                teamID,
                role: team_model_1.TeamMemberRole.OWNER,
            },
        });
        const member = await this.getTeamMember(teamID, userUid);
        if (!member)
            return E.left(errors_1.TEAM_INVALID_ID_OR_USER);
        if (ownerCount === 1 && member.role === team_model_1.TeamMemberRole.OWNER) {
            return E.left(errors_1.TEAM_ONLY_ONE_OWNER);
        }
        try {
            await this.prisma.teamMember.delete({
                where: {
                    teamID_userUid: {
                        userUid,
                        teamID,
                    },
                },
            });
        }
        catch (e) {
            return E.left(errors_1.TEAM_INVALID_ID_OR_USER);
        }
        this.pubsub.publish(`team/${teamID}/member_removed`, userUid);
        return E.right(true);
    }
    async createTeam(name, creatorUid) {
        const isValidName = this.validateTeamName(name);
        if (E.isLeft(isValidName))
            return isValidName;
        const team = await this.prisma.team.create({
            data: {
                name: name,
                members: {
                    create: {
                        userUid: creatorUid,
                        role: team_model_1.TeamMemberRole.OWNER,
                    },
                },
            },
        });
        return E.right(team);
    }
    async getTeamsOfUser(uid, cursor) {
        if (!cursor) {
            const entries = await this.prisma.teamMember.findMany({
                take: 10,
                where: {
                    userUid: uid,
                },
                include: {
                    team: true,
                },
            });
            return entries.map((entry) => entry.team);
        }
        else {
            const entries = await this.prisma.teamMember.findMany({
                take: 10,
                skip: 1,
                cursor: {
                    teamID_userUid: {
                        teamID: cursor,
                        userUid: uid,
                    },
                },
                where: {
                    userUid: uid,
                },
                include: {
                    team: true,
                },
            });
            return entries.map((entry) => entry.team);
        }
    }
    async getTeamWithID(teamID) {
        try {
            const team = await this.prisma.team.findUnique({
                where: {
                    id: teamID,
                },
            });
            return team;
        }
        catch (_e) {
            return null;
        }
    }
    getTeamWithIDTE(teamID) {
        return (0, function_1.pipe)(() => this.getTeamWithID(teamID), TE.fromTask, TE.chain(TE.fromPredicate((x) => !!x, () => errors_1.TEAM_INVALID_ID)));
    }
    async filterMismatchedUsers(teamID, members) {
        const memberUsers = await Promise.all(members.map(async (member) => {
            const user = await this.userService.findUserById(member.userUid);
            if (O.isSome(user))
                return member;
            else
                return null;
        }));
        return memberUsers.filter((x) => x !== null);
    }
    async getTeamMember(teamID, userUid) {
        try {
            const teamMember = await this.prisma.teamMember.findUnique({
                where: {
                    teamID_userUid: {
                        teamID,
                        userUid,
                    },
                },
            });
            if (!teamMember)
                return null;
            return {
                membershipID: teamMember.id,
                userUid: userUid,
                role: team_model_1.TeamMemberRole[teamMember.role],
            };
        }
        catch (e) {
            return null;
        }
    }
    getTeamMemberTE(teamID, userUid) {
        return (0, function_1.pipe)(() => this.getTeamMember(teamID, userUid), TE.fromTask, TE.chain(TE.fromPredicate((x) => !!x, () => errors_1.TEAM_MEMBER_NOT_FOUND)));
    }
    async getRoleOfUserInTeam(teamID, userUid) {
        const teamMember = await this.getTeamMember(teamID, userUid);
        return teamMember ? teamMember.role : null;
    }
    isUserOwnerRoleInTeams(uid) {
        return (0, function_1.pipe)(() => this.prisma.teamMember.count({
            where: {
                userUid: uid,
                role: team_model_1.TeamMemberRole.OWNER,
            },
            take: 1,
        }), T.map((count) => count > 0));
    }
    deleteUserFromAllTeams(uid) {
        return (0, function_1.pipe)(() => this.prisma.teamMember.findMany({
            where: {
                userUid: uid,
            },
        }), T.chainFirst((0, function_1.flow)(A.map((member) => async () => {
            const res = await this.leaveTeam(member.teamID, uid);
            if (E.isLeft(res))
                (0, utils_1.throwErr)(res.left);
            return E.right(res);
        }), T.sequenceArray)), T.map(() => undefined));
    }
    async getTeamMembers(teamID) {
        const dbTeamMembers = await this.prisma.teamMember.findMany({
            where: {
                teamID,
            },
        });
        const members = dbTeamMembers.map((entry) => ({
            membershipID: entry.id,
            userUid: entry.userUid,
            role: team_model_1.TeamMemberRole[entry.role],
        }));
        return this.filterMismatchedUsers(teamID, members);
    }
    async getCountOfMembersInTeam(teamID) {
        const memberCount = await this.prisma.teamMember.count({
            where: {
                teamID: teamID,
            },
        });
        return memberCount;
    }
    async getMembersOfTeam(teamID, cursor) {
        let teamMembers;
        if (!cursor) {
            teamMembers = await this.prisma.teamMember.findMany({
                take: 10,
                where: {
                    teamID,
                },
            });
        }
        else {
            teamMembers = await this.prisma.teamMember.findMany({
                take: 10,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    teamID,
                },
            });
        }
        const members = teamMembers.map((entry) => ({
            membershipID: entry.id,
            userUid: entry.userUid,
            role: team_model_1.TeamMemberRole[entry.role],
        }));
        return this.filterMismatchedUsers(teamID, members);
    }
    async fetchAllTeams(cursorID, take) {
        const options = {
            skip: cursorID ? 1 : 0,
            take: take,
            cursor: cursorID ? { id: cursorID } : undefined,
        };
        const fetchedTeams = await this.prisma.team.findMany(options);
        return fetchedTeams;
    }
    async getTeamsCount() {
        const teamsCount = await this.prisma.team.count();
        return teamsCount;
    }
};
TeamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService,
        pubsub_service_1.PubSubService])
], TeamService);
exports.TeamService = TeamService;
//# sourceMappingURL=team.service.js.map