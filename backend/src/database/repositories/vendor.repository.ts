import { DataSource, Repository } from 'typeorm';
import { VendorEntity } from '../entities/vendor.entity';
import { VendorFilterInput } from 'src/graphql/inputs/vendorFilter';

// Assuming AppDataSource is your configured DataSource
export type VendorRepositoryType = Repository<VendorEntity> & {
  findVendorById(id: string): Promise<VendorEntity | null>;
  findAllVendors(): Promise<VendorEntity[]>;
  findVendorsWithFilters(filters: VendorFilterInput): Promise<VendorEntity[]>;
};

// Use the DataSource to get the base repository and extend it
export const VendorRepository = (dataSource: DataSource): VendorRepositoryType =>
  dataSource.getRepository(VendorEntity).extend({

    findVendorById(id: string): Promise<VendorEntity | null> {
      // Removed the 'relations: ['location']' since it's not in the schema
      return this.findOne({ where: { id } });
    },

    findAllVendors(): Promise<VendorEntity[]> {
      // Removed the 'relations: ['location']' since it's not in the schema
      return this.find();
    },

    findVendorsWithFilters(filters: VendorFilterInput): Promise<VendorEntity[]> {
      const query = this.createQueryBuilder('vendor');

      if (filters.city) {
        // Assuming there's a city field in the VendorEntity, if not, this should be adjusted
        query.andWhere('vendor.city = :city', { city: filters.city });
      }

      if (filters.category) {
        query.andWhere('vendor.category = :category', { category: filters.category });
      }

      return query.getMany();
    },
  });
