import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { PackageService } from 'src/modules/package/package.service';
import { PackageModel } from '../models/package.model';
import { PackageEntity } from 'src/database/entities/package.entity';
import { CreatePackageInput } from '../inputs/createPackage.input';
import { Query } from '@nestjs/graphql';
import { PackageFilterInput } from '../inputs/packageFilter.input';
import { UpdatePackageInput } from '../inputs/updatePackage.input';

@Resolver()
export class PackageResolver {
  constructor(
    private readonly packageService: PackageService,
  ) {}

  @Mutation(() => PackageModel)
  async createPackage(
    @Args('input') input: CreatePackageInput,
    @Args({ name: 'mediaUrls', type: () => [String] }) mediaUrls: string[],
  ): Promise<PackageEntity> {
    return this.packageService.createPackage(input, mediaUrls);
  }

  @Mutation(() => PackageModel)
  async updatePackage(
    @Args('id') id: string,
    @Args('input') input: UpdatePackageInput,
    @Args({ name: 'mediaUrls', type: () => [String] }) mediaUrls: string[],
  ): Promise<PackageEntity> {
    return this.packageService.updatePackage(id, input, mediaUrls);
  }

  @Mutation(() => Boolean)
  async deletePackage(@Args('id') id: string): Promise<boolean> {
    return this.packageService.deletePackage(id);
  }

  @Mutation(() => PackageModel)
  async updatePackageBanner(
    @Args('id') id: string,
    @Args('fileUrl') fileUrl: string,
  ): Promise<PackageEntity> {
    return this.packageService.updatePackageBanner(id, fileUrl);
  }

  @Query(() => [PackageModel])
  async findPackages(
    @Args('filter', { nullable: true }) filter?: PackageFilterInput
  ): Promise<PackageEntity[]> {
    return this.packageService.findPackagesByFilters(filter || {});
  }

}
