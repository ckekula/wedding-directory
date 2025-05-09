import { Resolver, Args, Mutation, Query, Int, ResolveField, Parent } from '@nestjs/graphql';
import { OfferingService } from '../../modules/offering/offering.service';
import { OfferingModel } from '../models/offering.model';
import { OfferingEntity } from '../../database/entities/offering.entity';
import { CreateOfferingInput } from '../inputs/createOffering.input';
import { OfferingFilterInput } from '../inputs/offeringFilter.input';
import { UpdateOfferingInput } from '../inputs/updateOffering.input';
import { ReviewModel } from '../models/review.model';
import { ReviewService } from '../../modules/review/review.service';

@Resolver(() => OfferingModel)
export class OfferingResolver {
  constructor(
    private readonly offeringService: OfferingService,
    private readonly reviewService: ReviewService,
  ) {}

  @Mutation(() => OfferingModel)
  async createOffering(
    @Args('input') input: CreateOfferingInput,
  ): Promise<OfferingEntity> {
    return this.offeringService.createOffering(input);
  }

  @Mutation(() => OfferingModel)
  async updateOffering(
    @Args('id') id: string,
    @Args('input') input: UpdateOfferingInput,
  ): Promise<OfferingEntity> {
    return this.offeringService.updateOffering(id, input);
  }

  @Mutation(() => Boolean)
  async deleteOffering(@Args('id') id: string): Promise<boolean> {
    return this.offeringService.deleteOffering(id);
  }

  @Mutation(() => OfferingModel)
  async updateOfferingBanner(
    @Args('id') id: string,
    @Args('fileUrl') fileUrl: string,
  ): Promise<OfferingEntity> {
    return this.offeringService.updateOfferingBanner(id, fileUrl);
  }

  @Query(() => OfferingModel)
  async findOfferingById(@Args('id') id: string): Promise<OfferingEntity> {
    return this.offeringService.findOfferingById(id);
  }

  @Query(() => [OfferingModel])
  async findOfferings(
    @Args('filter', { nullable: true }) filter?: OfferingFilterInput
  ): Promise<OfferingEntity[]> {
    return this.offeringService.findOfferingsByFilters(filter || {});
  }

  @Query(() => [OfferingModel])
  async findOfferingsByVendor(
    @Args('id') id: string,
  ): Promise<OfferingEntity[]> {
    return this.offeringService.findOfferingsByVendor(id);
  }

  @Mutation(() => Boolean)
  async deleteOfferingBanner(
    @Args('id') id: string,
  ): Promise<boolean> {
    return this.offeringService.deleteOfferingBanner(id);
  }

  @Mutation(() => Boolean)
  async deleteOfferingShowcaseImage(
    @Args('id') id: string,
    @Args('index', { type: () => Int }) index: number,
  ): Promise<boolean> {
    return this.offeringService.deleteOfferingShowcaseImage(id, index);
  }

  @Mutation(() => Boolean)
  async deleteOfferingVideo(
    @Args('id') id: string,
  ): Promise<boolean> {
    return this.offeringService.deleteOfferingVideo(id);
  }

  @ResolveField(() => [ReviewModel])
  async reviews(@Parent() offering: OfferingModel) {
    const { id } = offering;
    return this.reviewService.findReviewsByOffering(id);
  }
}
