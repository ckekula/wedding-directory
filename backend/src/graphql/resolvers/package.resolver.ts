import { Args, Mutation, Resolver } from "@nestjs/graphql/dist";
import { PackageService } from "src/modules/package/package.service";
import { PackageModel } from "../models/package.model";
import { PackageInput } from "../inputs/package.input";
import { PackageEntity } from "src/database/entities/package.entity";

@Resolver()
export class PackageResolver {
  constructor(
    private readonly packageService: PackageService,
  ) {}

  @Mutation(() => PackageModel)
  async createPackage(
    @Args('input') input: PackageInput,
    @Args('offering_id') offering_id: string): Promise<PackageEntity> {
    return this.packageService.createPackage(input, offering_id);
  }

  @Mutation(() => PackageModel)
  async updatePackage(@Args('id') id: string, @Args('input') input: PackageInput): Promise<PackageEntity> {
    return this.packageService.updatePackage(id, input);
  }

  @Mutation(() => PackageModel)
  async deletePackage(@Args('id') id: string): Promise<PackageEntity> {
    return this.packageService.deletePackage(id);
  }
}