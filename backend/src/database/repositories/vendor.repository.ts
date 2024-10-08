import { DataSource, Repository } from 'typeorm';
import { VendorEntity } from '../entities/vendor.entity';

export type VendorRepositoryType = Repository<VendorEntity> & {
  findVendorById(id: string): Promise<VendorEntity | null>;
  findAllVendors(): Promise<VendorEntity[]>;
};

// Use the DataSource to get the base repository and extend it
export const VendorRepository = (dataSource: DataSource): VendorRepositoryType =>
  dataSource.getRepository(VendorEntity).extend({

  findVendorById(id: string): Promise<VendorEntity | null> {
    return this.findOne({ where: { id }, relations: ['package'] });
  },

  findAllVendors(): Promise<VendorEntity[]> {
    return this.find({ relations: ['package'] });
  }
});
