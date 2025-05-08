import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
  @Field()
  visitorId: string;

  @Field()
  offeringId: string;
}
