"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEnvironmentsModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const pubsub_module_1 = require("../pubsub/pubsub.module");
const user_module_1 = require("../user/user.module");
const user_resolver_1 = require("./user.resolver");
const user_environments_resolver_1 = require("./user-environments.resolver");
const user_environments_service_1 = require("./user-environments.service");
let UserEnvironmentsModule = class UserEnvironmentsModule {
};
UserEnvironmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, pubsub_module_1.PubSubModule, user_module_1.UserModule],
        providers: [
            user_environments_resolver_1.UserEnvironmentsResolver,
            user_environments_service_1.UserEnvironmentsService,
            user_resolver_1.UserEnvsUserResolver,
        ],
        exports: [user_environments_service_1.UserEnvironmentsService],
    })
], UserEnvironmentsModule);
exports.UserEnvironmentsModule = UserEnvironmentsModule;
//# sourceMappingURL=user-environments.module.js.map