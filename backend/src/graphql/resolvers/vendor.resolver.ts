import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { VendorModel } from "../models/vendor.model";
import { VendorEntity } from "src/database/entities/vendor.entity";
import { VendorService } from "src/modules/vendor/vendor.service";
import { VendorFilterInput } from "../inputs/vendorFilter";
import { CreateVendorInput } from "../inputs/createVendor";

@Resolver(() => VendorModel)
export class VendorResolver {
  constructor(
      private readonly vendorService: VendorService,
  ) {}

  @Query(() => VendorModel)
  async findVendorById(@Args('id', { type: () => String }) id: string): Promise<VendorEntity> {
    return this.vendorService.findVendorById(id);
  }

  @Query(() => [VendorModel])
  async findAllVendors(): Promise<VendorEntity[]> {
    return this.vendorService.findAllVendors();
  }

  @Query(() => [VendorModel])
  async findVendorsWithFilters(@Args('filters') filters: VendorFilterInput): Promise<VendorEntity[]> {
    return this.vendorService.findVendorsWithFilters(filters);
  }

  @Query(() => [String])
  async autocompleteLocation(@Args('input') input: string) {
    const result = await this.vendorService.autocompleteLocation(input);
    return result.predictions.map((place) => place.description);
  }

  @Mutation(() => VendorModel)
  async createVendor(@Args('input') input: CreateVendorInput): Promise<VendorEntity> {
    return this.vendorService.createVendor(input);
  }
 
}