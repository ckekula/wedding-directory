import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { BudgetToolService } from '../../modules/budget/budget_tool.service';
import { BudgetToolModel } from '../models/budget_tool.model';
import { CreateBudgetToolInput } from '../inputs/createBudgetTool.input';
import { UpdateBudgetToolInput } from '../inputs/updateBudgetTool.input';

@Resolver(() => BudgetToolModel)
export class BudgetToolResolver {
  constructor(private readonly budgetToolService: BudgetToolService) {}

  @Query(() => BudgetToolModel, { name: 'budgetTool' , nullable: true })
  getBudgetTool(@Args('visitorId') visitorId: string ){
    return this.budgetToolService.findByVisitorId(visitorId);
  }

  @Mutation(() => BudgetToolModel)
  createBudgetTool(@Args('createBudgetToolInput') createBudgetToolInput: CreateBudgetToolInput) {
    return this.budgetToolService.create(createBudgetToolInput);
  }

  @Mutation(() => BudgetToolModel)
  updateBudgetTool(@Args('id') id: string, @Args('updateBudgetToolInput') updateBudgetToolInput: UpdateBudgetToolInput) {
    return this.budgetToolService.update(id, updateBudgetToolInput);
  }

  @Mutation(() => Boolean)
  deleteBudgetTool(@Args('id') id: string) {
    return this.budgetToolService.delete(id);
  }

  @ResolveField()
  async budgetItems(@Parent() budgetTool: BudgetToolModel) {
    return this.budgetToolService.getBudgetItems(budgetTool.id);
  }
}
