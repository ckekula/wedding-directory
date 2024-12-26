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

  async findAllMyVendorsById(visitorId: string, category: string) {
    return this.myVendorsRepository.findAllByVisitorAndCategory(visitorId, category);
  }

  async addToMyVendors(visitorId: string, category: string) {
    return this.myVendorsRepository.addToMyVendors(visitorId, category);
  }

  async removeFromMyVendors(visitorId: string, category: string) {
    return this.myVendorsRepository.removeFromMyVendors(visitorId, category);
  }
}
