import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ChatbotStatus {
  @Field()
  status: string;
}