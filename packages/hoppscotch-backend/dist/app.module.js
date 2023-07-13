"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const user_module_1 = require("./user/user.module");
const GQLComplexityPlugin_1 = require("./plugins/GQLComplexityPlugin");
const auth_module_1 = require("./auth/auth.module");
const user_settings_module_1 = require("./user-settings/user-settings.module");
const user_environments_module_1 = require("./user-environment/user-environments.module");
const user_request_module_1 = require("./user-request/user-request.module");
const user_history_module_1 = require("./user-history/user-history.module");
const helper_1 = require("./auth/helper");
const team_module_1 = require("./team/team.module");
const team_environments_module_1 = require("./team-environments/team-environments.module");
const team_collection_module_1 = require("./team-collection/team-collection.module");
const team_request_module_1 = require("./team-request/team-request.module");
const team_invitation_module_1 = require("./team-invitation/team-invitation.module");
const admin_module_1 = require("./admin/admin.module");
const user_collection_module_1 = require("./user-collection/user-collection.module");
const shortcode_module_1 = require("./shortcode/shortcode.module");
const errors_1 = require("./errors");
const throttler_1 = require("@nestjs/throttler");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                buildSchemaOptions: {
                    numberScalarMode: 'integer',
                },
                cors: {
                    origin: process.env.WHITELISTED_ORIGINS.split(','),
                    credentials: true,
                },
                playground: process.env.PRODUCTION !== 'true',
                debug: process.env.PRODUCTION !== 'true',
                autoSchemaFile: true,
                installSubscriptionHandlers: true,
                subscriptions: {
                    'subscriptions-transport-ws': {
                        path: '/graphql',
                        onConnect: (_, websocket) => {
                            var _a;
                            try {
                                const cookies = (0, helper_1.subscriptionContextCookieParser)(websocket.upgradeReq.headers.cookie);
                                return {
                                    headers: Object.assign(Object.assign({}, (_a = websocket === null || websocket === void 0 ? void 0 : websocket.upgradeReq) === null || _a === void 0 ? void 0 : _a.headers), { cookies }),
                                };
                            }
                            catch (error) {
                                throw new common_1.HttpException(errors_1.COOKIES_NOT_FOUND, 400, {
                                    cause: new Error(errors_1.COOKIES_NOT_FOUND),
                                });
                            }
                        },
                    },
                },
                context: ({ req, res, connection }) => ({
                    req,
                    res,
                    connection,
                }),
                driver: apollo_1.ApolloDriver,
            }),
            throttler_1.ThrottlerModule.forRoot({
                ttl: +process.env.RATE_LIMIT_TTL,
                limit: +process.env.RATE_LIMIT_MAX,
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            admin_module_1.AdminModule,
            user_settings_module_1.UserSettingsModule,
            user_environments_module_1.UserEnvironmentsModule,
            user_history_module_1.UserHistoryModule,
            user_request_module_1.UserRequestModule,
            team_module_1.TeamModule,
            team_environments_module_1.TeamEnvironmentsModule,
            team_collection_module_1.TeamCollectionModule,
            team_request_module_1.TeamRequestModule,
            team_invitation_module_1.TeamInvitationModule,
            user_collection_module_1.UserCollectionModule,
            shortcode_module_1.ShortcodeModule,
        ],
        providers: [GQLComplexityPlugin_1.GQLComplexityPlugin],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map