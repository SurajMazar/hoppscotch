import { User } from 'src/user/user.model';
import { UserSettings } from './user-settings.model';
import { UserSettingsService } from './user-settings.service';
export declare class UserSettingsUserResolver {
    private readonly userSettingsService;
    constructor(userSettingsService: UserSettingsService);
    settings(user: User): Promise<UserSettings>;
}
