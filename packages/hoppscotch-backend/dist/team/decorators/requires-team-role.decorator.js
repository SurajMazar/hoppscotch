"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiresTeamRole = void 0;
const common_1 = require("@nestjs/common");
const RequiresTeamRole = (...roles) => (0, common_1.SetMetadata)('requiresTeamRole', roles);
exports.RequiresTeamRole = RequiresTeamRole;
//# sourceMappingURL=requires-team-role.decorator.js.map