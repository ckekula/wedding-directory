import { DataSource, Repository } from 'typeorm';
import { VendorEntity } from '../entities/vendor.entity';
import { VendorFilterInput } from 'src/graphql/inputs/vendorFilter';

// Assuming AppDataSource is your configured DataSource
export type VendorRepositoryType = Repository<VendorEntity> & {
  findVendorById(id: number): Promise<VendorEntity | null>;
  findAllVendors(): Promise<VendorEntity[]>;
  findVendorsWithFilters(filters: VendorFilterInput): Promise<VendorEntity[]>;
};

// Use the DataSource to get the base repository and extend it
export const VendorRepository = (dataSource: DataSource): VendorRepositoryType =>
  dataSource.getRepository(VendorEntity).extend({
    
    findVendorById(id: number): Promise<VendorEntity | null> {
      return this.findOne({ where: { id }, relations: ['location'] });
    },

    findAllVendors(): Promise<VendorEntity[]> {
      return this.find({ relations: ['location'] });
    },

    findVendorsWithFilters(filters: VendorFilterInput): Promise<VendorEntity[]> {
      const query = this.createQueryBuilder('vendor')
        .leftJoinAndSelect('vendor.location', 'location');

      if (filters.city) {
        query.andWhere('location.city = :city', { city: filters.city });
      }

      if (filters.category) {
        query.andWhere('vendor.category = :category', { category: filters.category });
      }

      return query.getMany();
    },
  });
