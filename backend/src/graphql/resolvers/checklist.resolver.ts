import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ChecklistService } from '../../modules/checklist/checklist.service';
import { ChecklistModel } from '../models/checklist.model';
import { CreateChecklistInput } from '../inputs/createChecklistInput';
import { UpdateChecklistInput } from '../inputs/updateChecklistInput';

@Resolver(() => ChecklistModel)
export class ChecklistResolver {
  constructor(private readonly checklistService: ChecklistService) {}

  @Query(() => [ChecklistModel])
  async getVisitorChecklists(@Args('visitorId') visitorId: string) {
    return this.checklistService.getByVisitor(visitorId);
  }

  @Mutation(() => ChecklistModel)
  async createChecklist(@Args('input') input: CreateChecklistInput) {
    return this.checklistService.create(input);
  }

  @Mutation(() => ChecklistModel)
  async updateChecklist(@Args('input') input: UpdateChecklistInput) {
    return this.checklistService.update(input);
  }

  @Mutation(() => Boolean)
  async deleteChecklist(@Args('id') id: string) {
    return this.checklistService.delete(id);
  }
}
