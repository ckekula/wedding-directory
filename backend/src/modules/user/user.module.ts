// src/modules/user/user.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserResolver } from '../../graphql/resolvers/user.resolver';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UserSettingService } from './userSetting.service';
import { UserSettingRepository } from 'src/database/repositories/userSetting.repository';
import { UserSettingsResolver } from 'src/graphql/resolvers/userSettings.resolver';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserSettingEntity } from 'src/database/entities/userSetting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserSettingEntity])],
  providers: [
    UserService,
    UserResolver,
    UserSettingService,
    UserSettingsResolver,
    UserRepository,
    UserSettingRepository,
  ],
})
export class UserModule {}
