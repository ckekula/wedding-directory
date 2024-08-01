import { UserSettingModel } from 'src/graphql/models/userSetting.model';
import { CreateUserSettingsInput } from '../inputs/createUserSettings';
import { UserSettingService } from 'src/modules/user/userSetting.service';
export declare class UserSettingsResolver {
    private userSettingsService;
    constructor(userSettingsService: UserSettingService);
    createUserSettings(createUserSettingsData: CreateUserSettingsInput): Promise<UserSettingModel>;
}
