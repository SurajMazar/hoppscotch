import { OnModuleInit } from '@nestjs/common';
import * as T from 'fp-ts/Task';
import * as TO from 'fp-ts/TaskOption';
import * as E from 'fp-ts/Either';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDataHandler } from 'src/user/user.data.handler';
import { Shortcode } from './shortcode.model';
import { PubSubService } from 'src/pubsub/pubsub.service';
import { UserService } from 'src/user/user.service';
import { PaginationArgs } from 'src/types/input-types.args';
import { AuthUser } from '../types/AuthUser';
export declare class ShortcodeService implements UserDataHandler, OnModuleInit {
    private readonly prisma;
    private readonly pubsub;
    private readonly userService;
    constructor(prisma: PrismaService, pubsub: PubSubService, userService: UserService);
    onModuleInit(): void;
    canAllowUserDeletion(user: AuthUser): TO.TaskOption<string>;
    onUserDelete(user: AuthUser): T.Task<void>;
    private returnShortCode;
    private generateShortCodeID;
    private generateUniqueShortCodeID;
    getShortCode(shortcode: string): Promise<E.Right<Shortcode> | E.Left<"shortcode/not_found">>;
    createShortcode(request: string, userUID: string | null): Promise<E.Right<Shortcode> | E.Left<"shortcode/invalid_json">>;
    fetchUserShortCodes(uid: string, args: PaginationArgs): Promise<Shortcode[]>;
    revokeShortCode(shortcode: string, uid: string): Promise<E.Right<boolean> | E.Left<"shortcode/not_found">>;
    deleteUserShortCodes(uid: string): Promise<number>;
}
