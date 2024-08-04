import { Injectable } from '@nestjs/common';
import { UserSettingEntity } from 'src/database/entities/userSetting.entity';
import { CreateUserSettingsInput } from 'src/graphql/inputs/createUserSettings';
import { UserSettingRepository } from 'src/database/repositories/userSetting.repository';

@Injectable()
export class UserSettingService {
  constructor(private userSettingRepository: UserSettingRepository) {}

  async findUserSettingById(userId: number): Promise<UserSettingEntity> {
    return this.userSettingRepository.findByUserId(userId);
  }

  async createUserSettings(createUserSettingsData: CreateUserSettingsInput): Promise<UserSettingEntity> {
    return this.userSettingRepository.createUserSettings(createUserSettingsData);
  }
}