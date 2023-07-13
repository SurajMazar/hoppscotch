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
exports.PaginationArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
let PaginationArgs = class PaginationArgs {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        nullable: true,
        defaultValue: undefined,
        description: 'Cursor for pagination, ID of the last item in the list',
    }),
    __metadata("design:type", String)
], PaginationArgs.prototype, "cursor", void 0);
__decorate([
    (0, graphql_1.Field)({
        nullable: true,
        defaultValue: 10,
        description: 'Number of items to fetch',
    }),
    __metadata("design:type", Number)
], PaginationArgs.prototype, "take", void 0);
PaginationArgs = __decorate([
    (0, graphql_1.ArgsType)(),
    (0, graphql_1.InputType)()
], PaginationArgs);
exports.PaginationArgs = PaginationArgs;
//# sourceMappingURL=input-types.args.js.map