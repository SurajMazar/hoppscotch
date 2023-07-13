"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const express_1 = require("express");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const common_1 = require("@nestjs/common");
const session = require("express-session");
const gql_schema_1 = require("./gql-schema");
async function bootstrap() {
    console.log(`Running in production: ${process.env.PRODUCTION}`);
    console.log(`Port: ${process.env.PORT}`);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(session({
        secret: process.env.SESSION_SECRET,
    }));
    app.use((0, express_1.json)({
        limit: '100mb',
    }));
    if (process.env.PRODUCTION === 'false') {
        console.log('Enabling CORS with development settings');
        app.enableCors({
            origin: process.env.WHITELISTED_ORIGINS.split(','),
            credentials: true,
        });
    }
    else {
        console.log('Enabling CORS with production settings');
        app.enableCors({
            origin: process.env.WHITELISTED_ORIGINS.split(','),
            credentials: true,
        });
    }
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.use(cookieParser());
    await app.listen(process.env.PORT || 3170);
}
if (!process.env.GENERATE_GQL_SCHEMA) {
    bootstrap();
}
else {
    (0, gql_schema_1.emitGQLSchemaFile)();
}
//# sourceMappingURL=main.js.map