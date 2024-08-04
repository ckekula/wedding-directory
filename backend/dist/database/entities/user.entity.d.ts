import { UserSettingEntity } from './userSetting.entity';
export declare class UserEntity {
    id: number;
    username: string;
    displayName?: string;
    settings?: UserSettingEntity;
}
