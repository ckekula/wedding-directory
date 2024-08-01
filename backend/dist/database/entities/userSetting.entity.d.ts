import { UserEntity } from './user.entity';
export declare class UserSettingEntity {
    id: number;
    userId: number;
    receiveNotifications: boolean;
    receiveEmails: boolean;
    user: UserEntity;
}
