import { EntityRepository, Repository } from 'typeorm';
import { UserSettingEntity } from '../entities/userSetting.entity';
import { CreateUserSettingsInput } from 'src/graphql/inputs/createUserSettings';

@EntityRepository(UserSettingEntity)
export class UserSettingRepository extends Repository<UserSettingEntity> {
  async findByUserId(userId: number): Promise<UserSettingEntity> {
    return this.findOne({ where: {userId} });
  }

  async createUserSettings(createUserSettingsData: CreateUserSettingsInput): Promise<UserSettingEntity> {
    const userSetting = this.create(createUserSettingsData);
    return this.save(userSetting);
  }
}