import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateBudgetToolInput {
  @Field({ nullable: true })
  totalBudget?: number;
}
