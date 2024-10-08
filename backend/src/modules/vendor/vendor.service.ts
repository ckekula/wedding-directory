import { Injectable } from '@nestjs/common';
import { VendorEntity } from 'src/database/entities/vendor.entity';
import { DataSource } from 'typeorm';
import { VendorRepositoryType, VendorRepository } from 'src/database/repositories/vendor.repository';
import { CreateVendorInput } from 'src/graphql/inputs/createVendor.input';
import * as bcrypt from 'bcryptjs';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class VendorService {
  private vendorRepository: VendorRepositoryType;

  constructor(
    private readonly dataSource: DataSource,
    private readonly httpService: HttpService
  ) {
    this.vendorRepository = VendorRepository(this.dataSource);
  }
  
  async autocompleteLocation(input: string) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;

    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
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

  public getVendorByEmail(email: string): Promise<VendorEntity | undefined> {
    return this.vendorRepository.findOne({ where: { email } });
  }
}
