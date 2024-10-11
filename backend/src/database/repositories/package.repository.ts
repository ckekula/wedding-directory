import { PackageEntity } from 'src/database/entities/package.entity';
import { DataSource } from 'typeorm';
import { VendorEntity } from '../entities/vendor.entity';
import { PackageRepositoryType } from 'src/graphql/types/packageTypes';

// Use the DataSource to get the base repository and extend it
export const PackageRepository = (dataSource: DataSource): PackageRepositoryType =>
  dataSource.getRepository(PackageEntity).extend({

    async createPackage(
      createPackageInput: Partial<PackageEntity>,
      vendor: VendorEntity,
    ): Promise<PackageEntity> {
      const _package = this.create({
        ...createPackageInput,
        vendor,
      });
      return this.save(_package);
    },

    async updatePackage(
      id: string,
      updatePackageInput: Partial<PackageEntity>,
      mediaUrls: string[],
    ): Promise<PackageEntity> {
      const _package = await this.findOne({ where: { id } });
      if (!_package) {
        throw new Error('Package not found');
      }
      return this.save({
        ..._package,
        ...updatePackageInput,
        media: mediaUrls,
      });
    },

    async deletePackage(id: string): Promise<boolean> {
      const result = await this.delete({ id });
      return result.affected > 0;
    },

    async findPackagesByFilters(category?: string, city?: string): Promise<PackageEntity[]> {
      const query = this.createQueryBuilder('package')
        .leftJoinAndSelect('package.vendor', 'vendor'); // Join with vendor

      if (category) {
        query.andWhere('package.category = :category', { category });
      }

      if (city) {
        query.andWhere('vendor.city = :city', { city });
      }

      return query.getMany();
    },
  });
