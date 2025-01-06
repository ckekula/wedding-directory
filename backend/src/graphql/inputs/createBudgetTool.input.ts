import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBudgetToolInput {
  @Field({ nullable: true })
  totalBudget?: number;

  @Field()
  visitorId: string;
}
