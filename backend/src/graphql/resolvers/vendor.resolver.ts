import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { VendorModel } from '../models/vendor.model';
import { VendorEntity } from '../../database/entities/vendor.entity';
import { VendorService } from '../../modules/vendor/vendor.service';
import { CreateVendorInput } from '../inputs/createVendor.input';
import { UpdateVendorInput } from '../inputs/updateVendor.input';

@Resolver(() => VendorModel)
export class VendorResolver {
  constructor(private readonly vendorService: VendorService) {}

  @Query(() => VendorModel)
  async findVendorById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<VendorEntity> {
    return this.vendorService.findVendorById(id);
  }

  @Query(() => [VendorModel])
  async findAllVendors(): Promise<VendorEntity[]> {
    return this.vendorService.findAllVendors();
  }

  @Query(() => [String])
  async autocompleteLocation(@Args('input') input: string) {
    const result = await this.vendorService.autocompleteLocation(input);
    return result.predictions.map((place) => place.description);
  }

  @Mutation(() => VendorModel)
  async createVendor(
    @Args('input') input: CreateVendorInput,
  ): Promise<VendorEntity> {
    return this.vendorService.createVendor(input);
  }

  @Mutation(() => VendorModel)
  async updateVendor(
    @Args('id') id: string,
    @Args('input') input: UpdateVendorInput,
  ): Promise<VendorEntity> {
    return this.vendorService.updateVendor(id, input);
  }

  @Mutation(() => Boolean)
  async deleteVendor(@Args('id') id: string): Promise<boolean> {
    try {
      await this.vendorService.deleteVendor(id);
      return true;
    } catch (error) {
      throw new Error(error.message || 'Error deleting vendor');
    }
  }

  @Mutation(() => VendorModel)
  async updateVendorProfilePic(
    @Args('id') id: string,
    @Args('fileUrl') fileUrl: string,
  ): Promise<VendorEntity> {
    return this.vendorService.updateVendorProfilePic(id, fileUrl);
  }

  @Query(() => [VendorModel])
  async findVendorsByOffering(
    @Args('offering_id') offeringId: string,
  ): Promise<VendorEntity[]> {
    return this.vendorService.findVendorsByOffering(offeringId);
  }
}
