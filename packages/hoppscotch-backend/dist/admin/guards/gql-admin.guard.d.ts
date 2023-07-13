import { ExecutionContext, CanActivate } from '@nestjs/common';
export declare class GqlAdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
