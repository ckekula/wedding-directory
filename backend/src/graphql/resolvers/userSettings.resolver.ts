import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserSettingModel } from 'src/graphql/models/userSetting.model';
import { CreateUserSettingsInput } from '../inputs/createUserSettings';
import { UserSettingService } from 'src/modules/user/userSetting.service';

@Resolver(() => UserSettingModel)
export class UserSettingsResolver {
  constructor(private userSettingsService: UserSettingService) {}

  @Mutation(() => UserSettingModel)
  async createUserSettings(
    @Args('createUserSettingsData')
    createUserSettingsData: CreateUserSettingsInput,
  ): Promise<UserSettingModel> {
    return this.userSettingsService.createUserSettings(createUserSettingsData);
  }
}