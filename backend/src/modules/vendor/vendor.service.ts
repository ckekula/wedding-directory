import { Injectable } from '@nestjs/common';
import { VendorEntity } from 'src/database/entities/vendor.entity';
import { VendorFilterInput } from 'src/graphql/inputs/vendorFilter';
import { DataSource } from 'typeorm';
import { VendorRepositoryType, VendorRepository } from 'src/database/repositories/vendor.repository';
import { CreateVendorInput } from 'src/graphql/inputs/createVendor';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class VendorService {
  private vendorRepository: VendorRepositoryType;

  constructor(private readonly dataSource: DataSource) {
    this.vendorRepository = VendorRepository(this.dataSource);
  }

  async findVendorsWithFilters(filters: VendorFilterInput): Promise<VendorEntity[]> {
    return this.vendorRepository.findVendorsWithFilters(filters);
  }

  async findAllVendors(): Promise<VendorEntity[]> {
    return this.vendorRepository.findAllVendors();
  }

  async findVendorById(id: string): Promise<VendorEntity | null> {
    return this.vendorRepository.findVendorById(id);
  }

  async createVendor(createVendorInput: CreateVendorInput): Promise<VendorEntity> {
    const hashedPassword = await bcrypt.hash(createVendorInput.password, 12);
    const vendor = this.vendorRepository.create({ ...createVendorInput, password: hashedPassword });
    return this.vendorRepository.save(vendor);
  }
}
