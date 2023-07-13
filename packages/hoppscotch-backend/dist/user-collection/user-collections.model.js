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
exports.UserCollectionExportJSONData = exports.UserCollectionRemovedData = exports.UserCollectionReorderData = exports.UserCollection = void 0;
const graphql_1 = require("@nestjs/graphql");
const RequestTypes_1 = require("../types/RequestTypes");
let UserCollection = class UserCollection {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of the user collection',
    }),
    __metadata("design:type", String)
], UserCollection.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Displayed title of the user collection',
    }),
    __metadata("design:type", String)
], UserCollection.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => RequestTypes_1.ReqType, {
        description: 'Type of the user collection',
    }),
    __metadata("design:type", String)
], UserCollection.prototype, "type", void 0);
UserCollection = __decorate([
    (0, graphql_1.ObjectType)()
], UserCollection);
exports.UserCollection = UserCollection;
let UserCollectionReorderData = class UserCollectionReorderData {
};
__decorate([
    (0, graphql_1.Field)({
        description: 'User Collection being moved',
    }),
    __metadata("design:type", UserCollection)
], UserCollectionReorderData.prototype, "userCollection", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'User Collection succeeding the collection being moved in its new position',
        nullable: true,
    }),
    __metadata("design:type", UserCollection)
], UserCollectionReorderData.prototype, "nextUserCollection", void 0);
UserCollectionReorderData = __decorate([
    (0, graphql_1.ObjectType)()
], UserCollectionReorderData);
exports.UserCollectionReorderData = UserCollectionReorderData;
let UserCollectionRemovedData = class UserCollectionRemovedData {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'ID of User Collection being removed',
    }),
    __metadata("design:type", String)
], UserCollectionRemovedData.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => RequestTypes_1.ReqType, {
        description: 'Type of the user collection',
    }),
    __metadata("design:type", String)
], UserCollectionRemovedData.prototype, "type", void 0);
UserCollectionRemovedData = __decorate([
    (0, graphql_1.ObjectType)()
], UserCollectionRemovedData);
exports.UserCollectionRemovedData = UserCollectionRemovedData;
(0, graphql_1.registerEnumType)(RequestTypes_1.ReqType, {
    name: 'CollType',
});
let UserCollectionExportJSONData = class UserCollectionExportJSONData {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'Stringified contents of the collection',
    }),
    __metadata("design:type", String)
], UserCollectionExportJSONData.prototype, "exportedCollection", void 0);
__decorate([
    (0, graphql_1.Field)(() => RequestTypes_1.ReqType, {
        description: 'Type of the user collection',
    }),
    __metadata("design:type", String)
], UserCollectionExportJSONData.prototype, "collectionType", void 0);
UserCollectionExportJSONData = __decorate([
    (0, graphql_1.ObjectType)()
], UserCollectionExportJSONData);
exports.UserCollectionExportJSONData = UserCollectionExportJSONData;
//# sourceMappingURL=user-collections.model.js.map