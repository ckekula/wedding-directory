import { UserSettingModel } from './userSetting.model';
export declare class UserModel {
    id: number;
    username: string;
    displayName?: string;
    settings?: UserSettingModel;
}
