import { Injectable } from '@nestjs/common';
import { PackageEntity } from 'src/database/entities/package.entity';
import { CreatePackageInput } from 'src/graphql/inputs/createPackage.input';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VendorEntity } from 'src/database/entities/vendor.entity';
import { PackageFilterInput } from 'src/graphql/inputs/packageFilter.input';
import { PackageRepository } from 'src/database/repositories/package.repository';
import { PackageRepositoryType } from 'src/graphql/types/packageTypes';

@Injectable()
export class PackageService {
  private packageRepository: PackageRepositoryType
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(VendorEntity)
    private readonly vendorRepository: Repository<VendorEntity>,

  ) {
    this.packageRepository = PackageRepository(this.dataSource);
  }

  async createPackage(
    createPackageInput: CreatePackageInput, 
    mediaUrls: string[]
  ): Promise<PackageEntity> {
    const vendor = await this.vendorRepository.findOne(
      { where: { id: createPackageInput.vendor_id } }
    );
    
    if (!vendor) {
      throw new Error('Vendor not found');
    }
    return this.packageRepository.createPackage(createPackageInput, vendor, mediaUrls);
  }

  async findPackagesByFilters(filterInput: PackageFilterInput): Promise<PackageEntity[]> {
    const { category, city } = filterInput;
    return this.packageRepository.findPackagesByFilters(category, city);
  }
}
