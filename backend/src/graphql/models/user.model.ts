import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserSettingModel } from './userSetting.model';

@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field({ nullable: true })
  displayName?: string;

  @Field(() => UserSettingModel, { nullable: true })
  settings?: UserSettingModel;
}
