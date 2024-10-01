import { Injectable } from '@nestjs/common';
import { PackageEntity } from 'src/database/entities/package.entity';
import { CreatePackageInput } from 'src/graphql/inputs/createPackage';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VendorEntity } from 'src/database/entities/vendor.entity';

@Injectable()
export class PackageService {
  constructor(

    @InjectRepository(PackageEntity)
    private readonly packageRepository: Repository<PackageEntity>,

    @InjectRepository(VendorEntity)
    private readonly vendorRepository: Repository<VendorEntity>,
  ) {}

  async findPackageById(id: string): Promise<PackageEntity | null> {
    return this.packageRepository.findOne({ where: { id } });
  }

  async createPackage(createPackageInput: CreatePackageInput): Promise<PackageEntity> {
    // Fetch the vendor by vendorId
    const vendor = await this.vendorRepository.findOne(
      { where: { id: createPackageInput.vendor_id } }
    );
    
    if (!vendor) {
      throw new Error('Vendor not found');
    }

    // Create and save the portfolio associated with the vendor
    const _package = this.packageRepository.create({
      ...createPackageInput,
      vendor, // associate with the vendor
    });

    return this.packageRepository.save(_package);
  }
}
