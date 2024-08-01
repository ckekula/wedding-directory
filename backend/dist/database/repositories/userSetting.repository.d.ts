import { Repository } from 'typeorm';
import { UserSettingEntity } from '../entities/userSetting.entity';
import { CreateUserSettingsInput } from 'src/graphql/inputs/createUserSettings';
export declare class UserSettingRepository extends Repository<UserSettingEntity> {
    findByUserId(userId: number): Promise<UserSettingEntity>;
    createUserSettings(createUserSettingsData: CreateUserSettingsInput): Promise<UserSettingEntity>;
}
