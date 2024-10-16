import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { OfferingService } from 'src/modules/offering/offering.service';
import { OfferingModel } from '../models/offering.model';
import { OfferingEntity } from 'src/database/entities/offering.entity';
import { CreateOfferingInput } from '../inputs/createOffering.input';
import { Query } from '@nestjs/graphql';
import { OfferingFilterInput } from '../inputs/offeringFilter.input';
import { UpdateOfferingInput } from '../inputs/updateOffering.input';

@Resolver()
export class OfferingResolver {
  constructor(
    private readonly offeringService: OfferingService,
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
    @Args({ name: 'mediaUrls', type: () => [String] }) mediaUrls: string[],
  ): Promise<OfferingEntity> {
    return this.offeringService.updateOffering(id, input, mediaUrls);
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

}
