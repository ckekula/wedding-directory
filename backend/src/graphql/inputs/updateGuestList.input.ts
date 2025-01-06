import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateGuestListInput {
  @Field()
  number: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  contact?: string;

  @Field({ nullable: true })
  email?: string;

  @Field()
  status: string;
}
