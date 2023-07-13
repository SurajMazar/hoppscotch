"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCollectionModule = void 0;
const common_1 = require("@nestjs/common");
const user_collection_service_1 = require("./user-collection.service");
const user_collection_resolver_1 = require("./user-collection.resolver");
const prisma_module_1 = require("../prisma/prisma.module");
const user_module_1 = require("../user/user.module");
const pubsub_module_1 = require("../pubsub/pubsub.module");
let UserCollectionModule = class UserCollectionModule {
};
UserCollectionModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, user_module_1.UserModule, pubsub_module_1.PubSubModule],
        providers: [user_collection_service_1.UserCollectionService, user_collection_resolver_1.UserCollectionResolver],
        exports: [user_collection_service_1.UserCollectionService],
    })
], UserCollectionModule);
exports.UserCollectionModule = UserCollectionModule;
//# sourceMappingURL=user-collection.module.js.map