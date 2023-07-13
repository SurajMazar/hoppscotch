import { User } from 'src/user/user.model';
import { UserSettings } from './user-settings.model';
import { UserSettingsService } from './user-settings.service';
import { PubSubService } from 'src/pubsub/pubsub.service';
import { AuthUser } from 'src/types/AuthUser';
export declare class UserSettingsResolver {
    private readonly userSettingsService;
    private readonly pubsub;
    constructor(userSettingsService: UserSettingsService, pubsub: PubSubService);
    createUserSettings(user: AuthUser, properties: string): Promise<UserSettings>;
    updateUserSettings(user: AuthUser, properties: string): Promise<UserSettings>;
    userSettingsCreated(user: User): AsyncIterator<unknown, any, undefined>;
    userSettingsUpdated(user: User): AsyncIterator<unknown, any, undefined>;
}
