import { DataSource } from 'typeorm';
import { VendorEntity } from '../entities/vendor.entity';
import { VendorRepositoryType } from 'src/database/types/vendorTypes';

// Use the DataSource to get the base repository and extend it
export const VendorRepository = (
  dataSource: DataSource,
): VendorRepositoryType =>
  dataSource.getRepository(VendorEntity).extend({
    findVendorById(id: string): Promise<VendorEntity | null> {
      return this.findOne({ where: { id }, relations: ['offering'] });
    },

    findAllVendors(): Promise<VendorEntity[]> {
      return this.find({ relations: ['offering'] });
    },

    async findVendorsByOffering(offeringId: string): Promise<VendorEntity[]> {
      return await this.createQueryBuilder('vendor')
        .leftJoinAndSelect('vendor.offering', 'offering')
        .where('offering.id = :offeringId', { offeringId })
        .getMany();
    },
  });
