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
exports.TeamEnvironmentsService = void 0;
const common_1 = require("@nestjs/common");
const function_1 = require("fp-ts/function");
const T = require("fp-ts/Task");
const TO = require("fp-ts/TaskOption");
const TE = require("fp-ts/TaskEither");
const A = require("fp-ts/Array");
const prisma_service_1 = require("../prisma/prisma.service");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const errors_1 = require("../errors");
let TeamEnvironmentsService = class TeamEnvironmentsService {
    constructor(prisma, pubsub) {
        this.prisma = prisma;
        this.pubsub = pubsub;
    }
    getTeamEnvironment(id) {
        return TO.tryCatch(() => this.prisma.teamEnvironment.findFirst({
            where: { id },
            rejectOnNotFound: true,
        }));
    }
    createTeamEnvironment(name, teamID, variables) {
        return (0, function_1.pipe)(() => this.prisma.teamEnvironment.create({
            data: {
                name: name,
                teamID: teamID,
                variables: JSON.parse(variables),
            },
        }), T.chainFirst((environment) => () => this.pubsub.publish(`team_environment/${environment.teamID}/created`, {
            id: environment.id,
            name: environment.name,
            teamID: environment.teamID,
            variables: JSON.stringify(environment.variables),
        })), T.map((data) => {
            return {
                id: data.id,
                name: data.name,
                teamID: data.teamID,
                variables: JSON.stringify(data.variables),
            };
        }));
    }
    deleteTeamEnvironment(id) {
        return (0, function_1.pipe)(TE.tryCatch(() => this.prisma.teamEnvironment.delete({
            where: {
                id: id,
            },
        }), () => errors_1.TEAM_ENVIRONMENT_NOT_FOUND), TE.chainFirst((environment) => TE.fromTask(() => this.pubsub.publish(`team_environment/${environment.teamID}/deleted`, {
            id: environment.id,
            name: environment.name,
            teamID: environment.teamID,
            variables: JSON.stringify(environment.variables),
        }))), TE.map((data) => true));
    }
    updateTeamEnvironment(id, name, variables) {
        return (0, function_1.pipe)(TE.tryCatch(() => this.prisma.teamEnvironment.update({
            where: { id: id },
            data: {
                name,
                variables: JSON.parse(variables),
            },
        }), () => errors_1.TEAM_ENVIRONMENT_NOT_FOUND), TE.chainFirst((environment) => TE.fromTask(() => this.pubsub.publish(`team_environment/${environment.teamID}/updated`, {
            id: environment.id,
            name: environment.name,
            teamID: environment.teamID,
            variables: JSON.stringify(environment.variables),
        }))), TE.map((environment) => ({
            id: environment.id,
            name: environment.name,
            teamID: environment.teamID,
            variables: JSON.stringify(environment.variables),
        })));
    }
    deleteAllVariablesFromTeamEnvironment(id) {
        return (0, function_1.pipe)(TE.tryCatch(() => this.prisma.teamEnvironment.update({
            where: { id: id },
            data: {
                variables: [],
            },
        }), () => errors_1.TEAM_ENVIRONMENT_NOT_FOUND), TE.chainFirst((environment) => TE.fromTask(() => this.pubsub.publish(`team_environment/${environment.teamID}/updated`, {
            id: environment.id,
            name: environment.name,
            teamID: environment.teamID,
            variables: JSON.stringify(environment.variables),
        }))), TE.map((environment) => ({
            id: environment.id,
            name: environment.name,
            teamID: environment.teamID,
            variables: JSON.stringify(environment.variables),
        })));
    }
    createDuplicateEnvironment(id) {
        return (0, function_1.pipe)(TE.tryCatch(() => this.prisma.teamEnvironment.findFirst({
            where: {
                id: id,
            },
            rejectOnNotFound: true,
        }), () => errors_1.TEAM_ENVIRONMENT_NOT_FOUND), TE.chain((environment) => TE.fromTask(() => this.prisma.teamEnvironment.create({
            data: {
                name: environment.name,
                teamID: environment.teamID,
                variables: environment.variables,
            },
        }))), TE.chainFirst((environment) => TE.fromTask(() => this.pubsub.publish(`team_environment/${environment.teamID}/created`, {
            id: environment.id,
            name: environment.name,
            teamID: environment.teamID,
            variables: JSON.stringify(environment.variables),
        }))), TE.map((environment) => ({
            id: environment.id,
            name: environment.name,
            teamID: environment.teamID,
            variables: JSON.stringify(environment.variables),
        })));
    }
    fetchAllTeamEnvironments(teamID) {
        return (0, function_1.pipe)(() => this.prisma.teamEnvironment.findMany({
            where: {
                teamID: teamID,
            },
        }), T.map(A.map((environment) => ({
            id: environment.id,
            name: environment.name,
            teamID: environment.teamID,
            variables: JSON.stringify(environment.variables),
        }))));
    }
    async totalEnvsInTeam(teamID) {
        const envCount = await this.prisma.teamEnvironment.count({
            where: {
                teamID: teamID,
            },
        });
        return envCount;
    }
};
TeamEnvironmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pubsub_service_1.PubSubService])
], TeamEnvironmentsService);
exports.TeamEnvironmentsService = TeamEnvironmentsService;
//# sourceMappingURL=team-environments.service.js.map