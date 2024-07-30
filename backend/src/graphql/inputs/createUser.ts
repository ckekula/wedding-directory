// Allows you to setup an object with all the fields 
// that are necessary for a certain task (ex: create user)

import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field({ nullable: true })
  displayName?: string;
}