import { PrismaService } from 'src/prisma/prisma.service';
import { PubSubService } from 'src/pubsub/pubsub.service';
import { User } from 'src/user/user.model';
import * as E from 'fp-ts/Either';
import { UserSettings } from './user-settings.model';
import { AuthUser } from 'src/types/AuthUser';
export declare class UserSettingsService {
    private readonly prisma;
    private readonly pubsub;
    constructor(prisma: PrismaService, pubsub: PubSubService);
    private castToUserSettings;
    fetchUserSettings(user: User): Promise<E.Right<UserSettings> | E.Left<"user_settings/not_found">>;
    createUserSettings(user: AuthUser, properties: string): Promise<E.Left<string> | E.Right<UserSettings>>;
    updateUserSettings(user: AuthUser, properties: string): Promise<E.Left<string> | E.Right<UserSettings>>;
}
