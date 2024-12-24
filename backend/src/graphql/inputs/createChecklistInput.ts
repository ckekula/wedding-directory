import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateChecklistInput {
  @Field()
  title: string;

  @Field()
  due_date: string; // ISO format string

  @Field()
  category: string;

  @Field({ nullable: true })
  notes?: string;

  @Field()
  completed: boolean;

  @Field()
  visitorId: string;
}
