import { Injectable } from '@nestjs/common';
import { MyVendorsRepository } from '../../database/repositories/myVendors.repository';
import { MyVendorsRepositoryType } from '../../database/types/myVendorsTypes';
import { DataSource } from 'typeorm';

@Injectable()
export class MyVendorsService {
  private myVendorsRepository: MyVendorsRepositoryType;

  constructor (
    private readonly dataSource: DataSource,
  ) {
    this.myVendorsRepository = MyVendorsRepository(this.dataSource);
  }

  async findAllMyVendorsByCategory(visitorId: string, category: string) {
    const results = await this.myVendorsRepository.findAllMyVendorsByCategory(visitorId, category);
    return results || [];
  }

  async findAllMyVendors(visitorId: string) {
    return this.myVendorsRepository.findAllMyVendors(visitorId);
  }

  async findMyVendorById(visitorId: string, offeringId: string) {
    return this.myVendorsRepository.findMyVendorById(visitorId, offeringId);
  }

  async addToMyVendors(visitorId: string, offeringId: string) {
    return this.myVendorsRepository.addToMyVendors(visitorId, offeringId);
  }

  async removeFromMyVendors(visitorId: string, offeringId: string) {
    return this.myVendorsRepository.removeFromMyVendors(visitorId, offeringId);
  }
}
