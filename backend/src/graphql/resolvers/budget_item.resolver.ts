import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { BudgetItemService } from '../../modules/budget/budget_item.service';
import { BudgetItemModel } from '../models/budget_item.model';
import { CreateBudgetItemInput } from '../inputs/createBudgetItem.input';
import { UpdateBudgetItemInput } from '../inputs/updateBudgetItem.input';

@Resolver(() => BudgetItemModel)
export class BudgetItemResolver {
  constructor(private readonly budgetItemService: BudgetItemService) {}

  @Query(() => [BudgetItemModel], { name: 'budgetItems' })
  getBudgetItems(@Args('budgetToolId') budgetToolId: string) {
    return this.budgetItemService.findByBudgetToolId(budgetToolId);
  }

  @Mutation(() => BudgetItemModel)
  createBudgetItem(@Args('createBudgetItemInput') createBudgetItemInput: CreateBudgetItemInput) {
    return this.budgetItemService.create(createBudgetItemInput);
  }


  @Mutation(() => BudgetItemModel)
  updateBudgetItem(@Args('id') id: string, @Args('updateBudgetItemInput') updateBudgetItemInput: UpdateBudgetItemInput) {
    return this.budgetItemService.update(id, updateBudgetItemInput);
  }

  @Mutation(() => Boolean)
  deleteBudgetItem(@Args('id') id: string) {
    return this.budgetItemService.delete(id);
  }
}
