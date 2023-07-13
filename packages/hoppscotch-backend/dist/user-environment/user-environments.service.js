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
exports.UserEnvironmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const pubsub_service_1 = require("../pubsub/pubsub.service");
const E = require("fp-ts/Either");
const O = require("fp-ts/Option");
const errors_1 = require("../errors");
const utils_1 = require("../utils");
let UserEnvironmentsService = class UserEnvironmentsService {
    constructor(prisma, pubsub) {
        this.prisma = prisma;
        this.pubsub = pubsub;
    }
    async fetchUserEnvironments(uid) {
        const environments = await this.prisma.userEnvironment.findMany({
            where: {
                userUid: uid,
                isGlobal: false,
            },
        });
        const userEnvironments = [];
        environments.forEach((environment) => {
            userEnvironments.push({
                userUid: environment.userUid,
                id: environment.id,
                name: environment.name,
                variables: JSON.stringify(environment.variables),
                isGlobal: environment.isGlobal,
            });
        });
        return userEnvironments;
    }
    async fetchUserGlobalEnvironment(uid) {
        const globalEnvironment = await this.prisma.userEnvironment.findFirst({
            where: {
                userUid: uid,
                isGlobal: true,
            },
        });
        if (globalEnvironment != null) {
            return E.right({
                userUid: globalEnvironment.userUid,
                id: globalEnvironment.id,
                name: globalEnvironment.name,
                variables: JSON.stringify(globalEnvironment.variables),
                isGlobal: globalEnvironment.isGlobal,
            });
        }
        return E.left(errors_1.USER_ENVIRONMENT_ENV_DOES_NOT_EXISTS);
    }
    async createUserEnvironment(uid, name, variables, isGlobal) {
        if (isGlobal) {
            const globalEnvExists = await this.checkForExistingGlobalEnv(uid);
            if (!O.isNone(globalEnvExists))
                return E.left(errors_1.USER_ENVIRONMENT_GLOBAL_ENV_EXISTS);
        }
        if (name === null && !isGlobal)
            return E.left(errors_1.USER_ENVIRONMENT_INVALID_ENVIRONMENT_NAME);
        const envVariables = (0, utils_1.stringToJson)(variables);
        if (E.isLeft(envVariables))
            return E.left(envVariables.left);
        const createdEnvironment = await this.prisma.userEnvironment.create({
            data: {
                userUid: uid,
                name: name,
                variables: envVariables.right,
                isGlobal: isGlobal,
            },
        });
        const userEnvironment = {
            userUid: createdEnvironment.userUid,
            id: createdEnvironment.id,
            name: createdEnvironment.name,
            variables: JSON.stringify(createdEnvironment.variables),
            isGlobal: createdEnvironment.isGlobal,
        };
        await this.pubsub.publish(`user_environment/${userEnvironment.userUid}/created`, userEnvironment);
        return E.right(userEnvironment);
    }
    async updateUserEnvironment(id, name, variables) {
        const envVariables = (0, utils_1.stringToJson)(variables);
        if (E.isLeft(envVariables))
            return E.left(envVariables.left);
        try {
            const updatedEnvironment = await this.prisma.userEnvironment.update({
                where: { id: id },
                data: {
                    name: name,
                    variables: envVariables.right,
                },
            });
            const updatedUserEnvironment = {
                userUid: updatedEnvironment.userUid,
                id: updatedEnvironment.id,
                name: updatedEnvironment.name,
                variables: JSON.stringify(updatedEnvironment.variables),
                isGlobal: updatedEnvironment.isGlobal,
            };
            await this.pubsub.publish(`user_environment/${updatedUserEnvironment.userUid}/updated`, updatedUserEnvironment);
            return E.right(updatedUserEnvironment);
        }
        catch (e) {
            return E.left(errors_1.USER_ENVIRONMENT_ENV_DOES_NOT_EXISTS);
        }
    }
    async deleteUserEnvironment(uid, id) {
        try {
            const globalEnvExists = await this.checkForExistingGlobalEnv(uid);
            if (O.isSome(globalEnvExists)) {
                const globalEnv = globalEnvExists.value;
                if (globalEnv.id === id) {
                    return E.left(errors_1.USER_ENVIRONMENT_GLOBAL_ENV_DELETION_FAILED);
                }
            }
            const deletedEnvironment = await this.prisma.userEnvironment.delete({
                where: {
                    id: id,
                },
            });
            const deletedUserEnvironment = {
                userUid: deletedEnvironment.userUid,
                id: deletedEnvironment.id,
                name: deletedEnvironment.name,
                variables: JSON.stringify(deletedEnvironment.variables),
                isGlobal: deletedEnvironment.isGlobal,
            };
            await this.pubsub.publish(`user_environment/${deletedUserEnvironment.userUid}/deleted`, deletedUserEnvironment);
            return E.right(true);
        }
        catch (e) {
            return E.left(errors_1.USER_ENVIRONMENT_ENV_DOES_NOT_EXISTS);
        }
    }
    async deleteUserEnvironments(uid) {
        const deletedEnvironments = await this.prisma.userEnvironment.deleteMany({
            where: {
                userUid: uid,
                isGlobal: false,
            },
        });
        await this.pubsub.publish(`user_environment/${uid}/deleted_many`, deletedEnvironments.count);
        return deletedEnvironments.count;
    }
    async clearGlobalEnvironments(uid, id) {
        const globalEnvExists = await this.checkForExistingGlobalEnv(uid);
        if (O.isNone(globalEnvExists))
            return E.left(errors_1.USER_ENVIRONMENT_GLOBAL_ENV_DOES_NOT_EXISTS);
        const env = globalEnvExists.value;
        if (env.id === id) {
            try {
                const updatedEnvironment = await this.prisma.userEnvironment.update({
                    where: { id: id },
                    data: {
                        variables: [],
                    },
                });
                const updatedUserEnvironment = {
                    userUid: updatedEnvironment.userUid,
                    id: updatedEnvironment.id,
                    name: updatedEnvironment.name,
                    variables: JSON.stringify(updatedEnvironment.variables),
                    isGlobal: updatedEnvironment.isGlobal,
                };
                await this.pubsub.publish(`user_environment/${updatedUserEnvironment.userUid}/updated`, updatedUserEnvironment);
                return E.right(updatedUserEnvironment);
            }
            catch (e) {
                return E.left(errors_1.USER_ENVIRONMENT_UPDATE_FAILED);
            }
        }
        else
            return E.left(errors_1.USER_ENVIRONMENT_IS_NOT_GLOBAL);
    }
    async checkForExistingGlobalEnv(uid) {
        const globalEnv = await this.prisma.userEnvironment.findFirst({
            where: {
                userUid: uid,
                isGlobal: true,
            },
        });
        if (globalEnv == null)
            return O.none;
        return O.some(globalEnv);
    }
};
UserEnvironmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pubsub_service_1.PubSubService])
], UserEnvironmentsService);
exports.UserEnvironmentsService = UserEnvironmentsService;
//# sourceMappingURL=user-environments.service.js.map