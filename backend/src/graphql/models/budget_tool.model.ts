import { Field, ObjectType } from '@nestjs/graphql';
import { BudgetItemModel } from './budget_item.model';
import { VisitorModel } from './visitor.model';

@ObjectType()
export class BudgetToolModel {
  @Field()
  id: string;

  @Field({ nullable: true })
  totalBudget?: number;

  @Field(() => VisitorModel)
  visitor: VisitorModel;

  @Field(() => [BudgetItemModel], { nullable: true })
  budgetItems?: BudgetItemModel[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
