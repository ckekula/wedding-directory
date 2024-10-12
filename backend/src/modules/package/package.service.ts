import { Injectable } from '@nestjs/common';
import { PackageEntity } from 'src/database/entities/package.entity';
import { CreatePackageInput } from 'src/graphql/inputs/createPackage.input';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VendorEntity } from 'src/database/entities/vendor.entity';
import { PackageFilterInput } from 'src/graphql/inputs/packageFilter.input';
import { PackageRepository } from 'src/database/repositories/package.repository';
import { PackageRepositoryType } from 'src/graphql/types/packageTypes';
import { UpdatePackageInput } from 'src/graphql/inputs/updatePackage.input';

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
    createPackageInput: CreatePackageInput
  ): Promise<PackageEntity> {
    const vendor = await this.vendorRepository.findOne(
      { where: { id: createPackageInput.vendor_id } }
    );
    
    if (!vendor) {
      throw new Error('Vendor not found');
    }
    return this.packageRepository.createPackage(createPackageInput, vendor);
  }

  async updatePackage(
    id: string,
    input: UpdatePackageInput,
    mediaUrls: string[]
  ): Promise<PackageEntity> {
    return this.packageRepository.updatePackage(id, input, mediaUrls);
  }

  async deletePackage(id: string): Promise<boolean> {
    return this.packageRepository.deletePackage(id);
  }

  async findPackagesByFilters(filterInput: PackageFilterInput): Promise<PackageEntity[]> {
    const { category, city } = filterInput;
    return this.packageRepository.findPackagesByFilters(category, city);
  }

  async updatePackageBanner(packageId: string, fileUrl: string): Promise<PackageEntity> {
    // Find the package by ID
    const pkg = await this.packageRepository.findOne({ where: { id: packageId } });

    if (!pkg) {
      throw new Error('Package not found');
    }

    // Update the profile_pic_url field
    pkg.banner = fileUrl;

    // Save the updated vendor to the database
    return await this.vendorRepository.save(pkg);
  }
}
