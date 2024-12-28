import { Injectable } from '@nestjs/common';
import { MyVendorsRepository } from 'src/database/repositories/myVendors.repository';
import { MyVendorsRepositoryType } from 'src/database/types/myVendorsTypes';
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
    return this.myVendorsRepository.findAllMyVendorsByCategory(visitorId, category);
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
