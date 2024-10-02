import { DataSource, Repository } from 'typeorm';
import { VendorEntity } from '../entities/vendor.entity';
import { VendorFilterInput } from 'src/graphql/inputs/vendorFilter';

export type VendorRepositoryType = Repository<VendorEntity> & {
  findVendorById(id: string): Promise<VendorEntity | null>;
  findAllVendors(): Promise<VendorEntity[]>;
  findVendorsWithFilters(filters: VendorFilterInput): Promise<VendorEntity[]>;
};

// Use the DataSource to get the base repository and extend it
export const VendorRepository = (dataSource: DataSource): VendorRepositoryType =>
  dataSource.getRepository(VendorEntity).extend({

    findVendorById(id: string): Promise<VendorEntity | null> {
      return this.findOne({ where: { id }, relations: ['package'] });
    },

    findAllVendors(): Promise<VendorEntity[]> {
      return this.find({ relations: ['package'] });
    },

    findVendorsWithFilters(filters: VendorFilterInput): Promise<VendorEntity[]> {
      const query = this.createQueryBuilder('vendor')
        .leftJoinAndSelect('vendor.package', 'package');

      if (filters.city) {
        query.andWhere('vendor.city = :city', { city: filters.city });
      }

      if (filters.category) {
        query.andWhere('package.category = :category', { category: filters.category });
      }

      return query.getMany();
    },
  });
