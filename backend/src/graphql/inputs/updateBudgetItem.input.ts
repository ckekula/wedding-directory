import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateBudgetItemInput {
  @Field({ nullable: true })
  itemName?: string;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  estimatedCost?: number;

  @Field({ nullable: true })
  amountPaid?: number;

  @Field({ nullable: true })
  specialNotes?: string;

  @Field({ nullable: true })
  isPaidInFull?: boolean;
}
