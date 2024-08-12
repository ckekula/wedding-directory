import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { VendorModel } from "../models/vendor.model";
import { VendorEntity } from "src/database/entities/vendor.entity";
import { VendorService } from "src/modules/vendor/vendor.service";
import { VendorFilterInput } from "../inputs/vendorFilter";

@Resolver(() => VendorModel)
export class VendorResolver {
  constructor(
      private vendorService: VendorService,
  ) {}

  @Query(() => [VendorModel])
  findVendorById(@Args('id', { type: () => Int }) id: number): Promise<VendorEntity> {
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
}