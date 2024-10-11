import { Injectable } from '@nestjs/common';
import { VendorEntity } from 'src/database/entities/vendor.entity';
import { DataSource } from 'typeorm';
import { VendorRepository } from 'src/database/repositories/vendor.repository';
import { CreateVendorInput } from 'src/graphql/inputs/createVendor.input';
import * as bcrypt from 'bcryptjs';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { VendorRepositoryType } from 'src/graphql/types/vendorTypes';
import { UpdateVendorInput } from 'src/graphql/inputs/updateVendor.input';


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

  async deleteVendor(id: string): Promise<void> {
    const vendor = await this.vendorRepository.findVendorById(id);
    if (!vendor) {
      throw new Error('Vendor not found');
    }
    
    // Delete the vendor and related packages
    await this.vendorRepository.remove(vendor);
  }

  async createVendor(createVendorInput: CreateVendorInput): Promise<VendorEntity> {
    const hashedPassword = await bcrypt.hash(createVendorInput.password, 12);
    const vendor = this.vendorRepository.create({ ...createVendorInput, password: hashedPassword });
    return this.vendorRepository.save(vendor);
  }

  async updateVendor(id: string, updateVendorInput: UpdateVendorInput): Promise<VendorEntity> {
    // Check if a password is provided in the update input
    if (updateVendorInput.password) {
      // Hash the password before updating
      updateVendorInput.password = bcrypt.hashSync(updateVendorInput.password, 12);
    }
    
    await this.vendorRepository.update(id, updateVendorInput);
    return this.vendorRepository.findOne({ where: { id } });
  }

  async updateVendorProfilePic(vendorId: string, fileUrl: string): Promise<VendorEntity> {
    // Find the vendor by ID
    const vendor = await this.vendorRepository.findOne({ where: { id: vendorId } });

    if (!vendor) {
      throw new Error('Vendor not found');
    }

    // Update the profile_pic_url field
    vendor.profile_pic_url = fileUrl;

    // Save the updated vendor to the database
    return await this.vendorRepository.save(vendor);
  }

  public getVendorByEmail(email: string): Promise<VendorEntity | undefined> {
    return this.vendorRepository.findOne({ where: { email } });
  }
}
