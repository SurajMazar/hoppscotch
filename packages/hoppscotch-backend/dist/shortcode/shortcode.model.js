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
exports.Shortcode = void 0;
const graphql_1 = require("@nestjs/graphql");
let Shortcode = class Shortcode {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'The shortcode. 12 digit alphanumeric.',
    }),
    __metadata("design:type", String)
], Shortcode.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'JSON string representing the request data',
    }),
    __metadata("design:type", String)
], Shortcode.prototype, "request", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Timestamp of when the Shortcode was created',
    }),
    __metadata("design:type", Date)
], Shortcode.prototype, "createdOn", void 0);
Shortcode = __decorate([
    (0, graphql_1.ObjectType)()
], Shortcode);
exports.Shortcode = Shortcode;
//# sourceMappingURL=shortcode.model.js.map