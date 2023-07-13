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
exports.GqlTeamEnvTeamGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const TE = require("fp-ts/TaskEither");
const O = require("fp-ts/Option");
const S = require("fp-ts/string");
const function_1 = require("fp-ts/function");
const utils_1 = require("../utils");
const team_environments_service_1 = require("./team-environments.service");
const errors_1 = require("../errors");
const team_service_1 = require("../team/team.service");
let GqlTeamEnvTeamGuard = class GqlTeamEnvTeamGuard {
    constructor(reflector, teamEnvironmentService, teamService) {
        this.reflector = reflector;
        this.teamEnvironmentService = teamEnvironmentService;
        this.teamService = teamService;
    }
    canActivate(context) {
        return (0, function_1.pipe)(TE.Do, TE.bindW('requiredRoles', () => (0, function_1.pipe)((0, utils_1.getAnnotatedRequiredRoles)(this.reflector, context), TE.fromOption(() => errors_1.BUG_TEAM_ENV_GUARD_NO_REQUIRE_ROLES))), TE.bindW('user', () => (0, function_1.pipe)((0, utils_1.getUserFromGQLContext)(context), TE.fromOption(() => errors_1.BUG_AUTH_NO_USER_CTX))), TE.bindW('envID', () => (0, function_1.pipe)((0, utils_1.getGqlArg)('id', context), O.fromPredicate(S.isString), TE.fromOption(() => errors_1.BUG_TEAM_ENV_GUARD_NO_ENV_ID))), TE.bindW('membership', ({ envID, user }) => (0, function_1.pipe)(this.teamEnvironmentService.getTeamEnvironment(envID), TE.fromTaskOption(() => errors_1.TEAM_ENVIRONMENT_NOT_FOUND), TE.chainW((env) => (0, function_1.pipe)(this.teamService.getTeamMemberTE(env.teamID, user.uid), TE.mapLeft(() => errors_1.TEAM_ENVIRONMENT_NOT_TEAM_MEMBER))))), TE.map(({ membership, requiredRoles }) => requiredRoles.includes(membership.role)), TE.getOrElse(utils_1.throwErr))();
    }
};
GqlTeamEnvTeamGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        team_environments_service_1.TeamEnvironmentsService,
        team_service_1.TeamService])
], GqlTeamEnvTeamGuard);
exports.GqlTeamEnvTeamGuard = GqlTeamEnvTeamGuard;
//# sourceMappingURL=gql-team-env-team.guard.js.map