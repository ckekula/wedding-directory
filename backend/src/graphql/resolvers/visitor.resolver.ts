import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VisitorService } from '../../modules/visitor/visitor.service';
import { VisitorModel } from '../models/visitor.model';
import { CreateVisitorInput } from '../inputs/createVisitor.input';
import { UpdateVisitorInput} from '../inputs/updateVisitor.input';
import { VisitorEntity } from '../../database/entities/visitor.entity';

@Resolver(() => VisitorModel)
export class VisitorResolver {
  constructor(private readonly visitorService: VisitorService) {}

  @Mutation(() => VisitorModel)
  async createVisitor(@Args('createVisitorInput') createVisitorInput: CreateVisitorInput): Promise<VisitorEntity> {
    return this.visitorService.create(createVisitorInput);
  }

  @Query(() => [VisitorModel])
  async findAllVisitors(): Promise<VisitorEntity[]> {
    return this.visitorService.findAllVisitors();
  }

  @Query(() => VisitorModel, { nullable: true })
  async findVisitorById(@Args('id') id: string): Promise<VisitorEntity> {
    return this.visitorService.findVisitorById(id);
  }

  @Mutation(() => Boolean)
  async removeVisitor(@Args('id') id: string): Promise<boolean> {
    await this.visitorService.remove(id);
    return true;
  }

  @Mutation(() => VisitorModel)
  async updateVisitor(
    @Args('id') id: string,
    @Args('input') updateVisitorInput: UpdateVisitorInput,
  ): Promise<VisitorEntity> {
    return this.visitorService.updateVisitor(id, updateVisitorInput);
  }

  @Mutation(() => VisitorModel)
async setWeddingDate(
  @Args('visitorId') visitorId: string,
  @Args('weddingDate') weddingDate: Date,
): Promise<VisitorEntity> {
  return this.visitorService.setWeddingDate(visitorId, weddingDate);
}


}
