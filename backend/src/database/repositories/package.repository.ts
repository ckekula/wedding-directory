import { PackageEntity } from 'src/database/entities/package.entity';
import { DataSource, Repository } from 'typeorm';

export type PackageRepositoryType = Repository<PackageEntity> & {
  findVendorById(id: string): Promise<PackageEntity | null>;
};

// Use the DataSource to get the base repository and extend it
export const PackageRepository = (dataSource: DataSource): PackageRepositoryType =>
    dataSource.getRepository(PackageEntity).extend({

    findVendorById(id: string): Promise<PackageEntity | null> {
      return this.findOne({ where: { id }, relations: ['portfolio'] });
    },
});
