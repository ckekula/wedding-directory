import { Field, ObjectType } from '@nestjs/graphql';
import { BudgetToolModel } from './budget_tool.model';

@ObjectType()
export class BudgetItemModel {
  @Field()
  id: string;

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
  isPaidInFull: boolean;

  @Field(() => BudgetToolModel)
  budgetTool: BudgetToolModel;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
