"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const pubsub_module_1 = require("../pubsub/pubsub.module");
const user_module_1 = require("../user/user.module");
const user_resolver_1 = require("./user.resolver");
const user_history_resolver_1 = require("./user-history.resolver");
const user_history_service_1 = require("./user-history.service");
let UserHistoryModule = class UserHistoryModule {
};
UserHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, pubsub_module_1.PubSubModule, user_module_1.UserModule],
        providers: [user_history_resolver_1.UserHistoryResolver, user_history_service_1.UserHistoryService, user_resolver_1.UserHistoryUserResolver],
        exports: [user_history_service_1.UserHistoryService],
    })
], UserHistoryModule);
exports.UserHistoryModule = UserHistoryModule;
//# sourceMappingURL=user-history.module.js.map