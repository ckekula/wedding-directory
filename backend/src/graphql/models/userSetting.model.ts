import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserSettingModel {

  @Field(() => Int)
  userId: number;

  @Field({ defaultValue: false })
  receiveNotifications: boolean;

  @Field({ defaultValue: false })
  receiveEmails: boolean;

}