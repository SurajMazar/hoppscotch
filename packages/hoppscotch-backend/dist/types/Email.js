"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailCodec = void 0;
const t = require("io-ts");
exports.EmailCodec = t.brand(t.string, (x) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(x), 'Email');
//# sourceMappingURL=Email.js.map