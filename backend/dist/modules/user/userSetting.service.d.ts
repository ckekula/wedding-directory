import { UserSettingEntity } from 'src/database/entities/userSetting.entity';
import { CreateUserSettingsInput } from 'src/graphql/inputs/createUserSettings';
import { UserSettingRepository } from 'src/database/repositories/userSetting.repository';
export declare class UserSettingService {
    private userSettingRepository;
    constructor(userSettingRepository: UserSettingRepository);
    getUserSettingById(userId: number): Promise<UserSettingEntity>;
    createUserSettings(createUserSettingsData: CreateUserSettingsInput): Promise<UserSettingEntity>;
}
