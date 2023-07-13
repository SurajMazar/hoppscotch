"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const mailer_service_1 = require("./mailer.service");
const utils_1 = require("../utils");
const errors_1 = require("../errors");
let MailerModule = class MailerModule {
};
MailerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRoot({
                transport: (_a = process.env.MAILER_SMTP_URL) !== null && _a !== void 0 ? _a : (0, utils_1.throwErr)(errors_1.MAILER_SMTP_URL_UNDEFINED),
                defaults: {
                    from: (_b = process.env.MAILER_ADDRESS_FROM) !== null && _b !== void 0 ? _b : (0, utils_1.throwErr)(errors_1.MAILER_FROM_ADDRESS_UNDEFINED),
                },
                template: {
                    dir: __dirname + '/templates',
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                },
            }),
        ],
        providers: [mailer_service_1.MailerService],
        exports: [mailer_service_1.MailerService],
    })
], MailerModule);
exports.MailerModule = MailerModule;
//# sourceMappingURL=mailer.module.js.map