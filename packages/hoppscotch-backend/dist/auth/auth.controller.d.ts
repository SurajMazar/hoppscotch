import { AuthService } from './auth.service';
import { SignInMagicDto } from './dto/signin-magic.dto';
import { VerifyMagicDto } from './dto/verify-magic.dto';
import { Response } from 'express';
import { AuthUser } from 'src/types/AuthUser';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signInMagicLink(authData: SignInMagicDto, origin: string): Promise<import("../types/Passwordless").DeviceIdentifierToken>;
    verify(data: VerifyMagicDto, res: Response): Promise<void>;
    refresh(user: AuthUser, refresh_token: string, res: any): Promise<void>;
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any, res: any): Promise<void>;
    githubAuth(req: any): Promise<void>;
    githubAuthRedirect(req: any, res: any): Promise<void>;
    microsoftAuth(req: any): Promise<void>;
    microsoftAuthRedirect(req: any, res: any): Promise<void>;
    logout(res: Response): Promise<Response<any, Record<string, any>>>;
    verifyAdmin(user: AuthUser): Promise<import("src/types/AuthUser").IsAdmin>;
}
