import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ChatbotResponse {
  @Field()
  response: string;

  @Field()
  conversationId: string;
}