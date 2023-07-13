import { Shortcode } from './shortcode.model';
import { ShortcodeService } from './shortcode.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.model';
import { PubSubService } from 'src/pubsub/pubsub.service';
import { AuthUser } from '../types/AuthUser';
import { JwtService } from '@nestjs/jwt';
import { PaginationArgs } from 'src/types/input-types.args';
export declare class ShortcodeResolver {
    private readonly shortcodeService;
    private readonly userService;
    private readonly pubsub;
    private jwtService;
    constructor(shortcodeService: ShortcodeService, userService: UserService, pubsub: PubSubService, jwtService: JwtService);
    shortcode(code: string): Promise<Shortcode>;
    myShortcodes(user: AuthUser, args: PaginationArgs): Promise<Shortcode[]>;
    createShortcode(request: string, ctx: any): Promise<Shortcode>;
    revokeShortcode(user: User, code: string): Promise<boolean>;
    myShortcodesCreated(user: AuthUser): AsyncIterator<unknown, any, undefined>;
    myShortcodesRevoked(user: AuthUser): AsyncIterator<Shortcode>;
}
