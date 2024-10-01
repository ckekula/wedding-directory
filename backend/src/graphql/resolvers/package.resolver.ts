import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PackageService } from 'src/modules/package/package.service';
import { PackageModel } from '../models/package.model';
import { PackageEntity } from 'src/database/entities/package.entity';
import { CreatePackageInput } from '../inputs/createPackage';

@Resolver()
export class PackageResolver {
  constructor(
    private readonly packageService: PackageService,
  ) {}

  @Query(() => PackageModel)
  async findPortfolioById(@Args('id', { type: () => String }) id: string): Promise<PackageEntity> {
    return this.packageService.findPortfolioById(id);
  }

  @Mutation(() => PackageModel)
  async createPortfolio(@Args('input') input: CreatePackageInput): Promise<PackageEntity> {
    return this.packageService.createPortfolio(input);
  }
 
}
