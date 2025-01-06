import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBudgetItemInput {
  @Field()
  itemName: string;

  @Field()
  category: string;

  @Field({ nullable: true })
  estimatedCost?: number;

  @Field({ nullable: true })
  amountPaid?: number;

  @Field({ nullable: true })
  specialNotes?: string;

  @Field()
  budgetToolId: string;
}
