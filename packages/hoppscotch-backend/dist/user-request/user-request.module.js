"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRequestModule = void 0;
const common_1 = require("@nestjs/common");
const user_collection_module_1 = require("../user-collection/user-collection.module");
const prisma_module_1 = require("../prisma/prisma.module");
const pubsub_module_1 = require("../pubsub/pubsub.module");
const user_collection_resolver_1 = require("./resolvers/user-collection.resolver");
const user_request_resolver_1 = require("./resolvers/user-request.resolver");
const user_request_service_1 = require("./user-request.service");
let UserRequestModule = class UserRequestModule {
};
UserRequestModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, pubsub_module_1.PubSubModule, user_collection_module_1.UserCollectionModule],
        providers: [
            user_request_resolver_1.UserRequestResolver,
            user_collection_resolver_1.UserRequestUserCollectionResolver,
            user_request_service_1.UserRequestService,
        ],
    })
], UserRequestModule);
exports.UserRequestModule = UserRequestModule;
//# sourceMappingURL=user-request.module.js.map