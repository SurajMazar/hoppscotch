import { TeamMemberRole } from '@prisma/client';
export declare const RequiresTeamRole: (...roles: TeamMemberRole[]) => import("@nestjs/common").CustomDecorator<string>;
