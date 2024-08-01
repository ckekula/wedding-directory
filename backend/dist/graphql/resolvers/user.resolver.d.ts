import { UserModel } from "../models/user.model";
import { CreateUserInput } from "../inputs/createUser";
import { UserService } from 'src/modules/user/user.service';
import { UserSettingService } from "src/modules/user/userSetting.service";
export declare class UserResolver {
    private userService;
    private userSettingService;
    constructor(userService: UserService, userSettingService: UserSettingService);
    getUserById(id: number): Promise<UserModel>;
    getAllUsers(): Promise<import("../../database/entities/user.entity").UserEntity[]>;
    getUserSettings(user: UserModel): Promise<import("../../database/entities/userSetting.entity").UserSettingEntity>;
    createUser(createUserData: CreateUserInput): Promise<import("../../database/entities/user.entity").UserEntity>;
}
