import { UserSettingModel } from 'src/graphql/models/userSetting.model';
export declare class UserEntity {
    id: number;
    username: string;
    displayName?: string;
    settings?: UserSettingModel;
}
