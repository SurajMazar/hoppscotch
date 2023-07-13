"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitGQLSchemaFile = void 0;
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
const utilities_1 = require("graphql/utilities");
const path = require("path");
const fs = require("fs");
const shortcode_resolver_1 = require("./shortcode/shortcode.resolver");
const team_collection_resolver_1 = require("./team-collection/team-collection.resolver");
const team_environments_resolver_1 = require("./team-environments/team-environments.resolver");
const team_invitation_resolver_1 = require("./team-invitation/team-invitation.resolver");
const team_request_resolver_1 = require("./team-request/team-request.resolver");
const team_member_resolver_1 = require("./team/team-member.resolver");
const team_resolver_1 = require("./team/team.resolver");
const user_collection_resolver_1 = require("./user-collection/user-collection.resolver");
const user_environments_resolver_1 = require("./user-environment/user-environments.resolver");
const user_history_resolver_1 = require("./user-history/user-history.resolver");
const user_request_resolver_1 = require("./user-request/resolvers/user-request.resolver");
const user_settings_resolver_1 = require("./user-settings/user-settings.resolver");
const user_resolver_1 = require("./user/user.resolver");
const common_1 = require("@nestjs/common");
const admin_resolver_1 = require("./admin/admin.resolver");
const team_resolver_2 = require("./team-environments/team.resolver");
const team_teaminvite_ext_resolver_1 = require("./team-invitation/team-teaminvite-ext.resolver");
const user_collection_resolver_2 = require("./user-request/resolvers/user-collection.resolver");
const user_resolver_2 = require("./user-environment/user.resolver");
const user_resolver_3 = require("./user-history/user.resolver");
const user_resolver_4 = require("./user-settings/user.resolver");
const RESOLVERS = [
    admin_resolver_1.AdminResolver,
    shortcode_resolver_1.ShortcodeResolver,
    team_resolver_1.TeamResolver,
    team_resolver_2.TeamEnvsTeamResolver,
    team_member_resolver_1.TeamMemberResolver,
    team_collection_resolver_1.TeamCollectionResolver,
    team_teaminvite_ext_resolver_1.TeamTeamInviteExtResolver,
    team_environments_resolver_1.TeamEnvironmentsResolver,
    team_resolver_2.TeamEnvsTeamResolver,
    team_invitation_resolver_1.TeamInvitationResolver,
    team_request_resolver_1.TeamRequestResolver,
    user_resolver_1.UserResolver,
    user_collection_resolver_1.UserCollectionResolver,
    user_environments_resolver_1.UserEnvironmentsResolver,
    user_resolver_2.UserEnvsUserResolver,
    user_resolver_3.UserHistoryUserResolver,
    user_history_resolver_1.UserHistoryResolver,
    user_collection_resolver_1.UserCollectionResolver,
    user_request_resolver_1.UserRequestResolver,
    user_collection_resolver_2.UserRequestUserCollectionResolver,
    user_settings_resolver_1.UserSettingsResolver,
    user_resolver_4.UserSettingsUserResolver,
];
const SCALARS = [];
async function emitGQLSchemaFile() {
    var _a;
    const logger = new common_1.Logger('emitGQLSchemaFile');
    try {
        const destination = path.resolve(__dirname, (_a = process.env.GQL_SCHEMA_EMIT_LOCATION) !== null && _a !== void 0 ? _a : '../gen/schema.gql');
        logger.log(`GQL_SCHEMA_EMIT_LOCATION: ${destination}`);
        const app = await core_1.NestFactory.create(graphql_1.GraphQLSchemaBuilderModule);
        await app.init();
        const gqlSchemaFactory = app.get(graphql_1.GraphQLSchemaFactory);
        logger.log(`Generating Schema against ${RESOLVERS.length} resolvers and ${SCALARS.length} custom scalars`);
        const schema = await gqlSchemaFactory.create(RESOLVERS, SCALARS, {
            numberScalarMode: 'integer',
        });
        const schemaString = (0, utilities_1.printSchema)(schema, {
            commentDescriptions: true,
        });
        logger.log(`Writing schema to GQL_SCHEMA_EMIT_LOCATION (${destination})`);
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.writeFileSync(destination, schemaString);
        logger.log(`Wrote schema to GQL_SCHEMA_EMIT_LOCATION (${destination})`);
    }
    catch (e) {
        logger.error(`Failed writing schema to GQL_SCHEMA_EMIT_LOCATION. Reason: ${e}`);
    }
}
exports.emitGQLSchemaFile = emitGQLSchemaFile;
//# sourceMappingURL=gql-schema.js.map