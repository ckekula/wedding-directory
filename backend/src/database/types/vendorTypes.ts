import { VendorEntity } from 'src/database/entities/vendor.entity';
import { Repository } from 'typeorm';

export type VendorRepositoryType = Repository<VendorEntity> & {
  findVendorById(id: string): Promise<VendorEntity | null>;
  findAllVendors(): Promise<VendorEntity[]>;
  findVendorsByOffering(id: string): Promise<VendorEntity[]>;
};
