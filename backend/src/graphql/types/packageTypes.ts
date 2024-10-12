import { PackageEntity } from "src/database/entities/package.entity";
import { VendorEntity } from "src/database/entities/vendor.entity";
import { Repository } from "typeorm";

export type PackageRepositoryType = Repository<PackageEntity> & {
    createPackage(
      createPackageInput: Partial<PackageEntity>,
      vendor: VendorEntity,
    ): Promise<PackageEntity>;

    updatePackage(
      id: string,
      updatePackageInput: Partial<PackageEntity>,
      mediaUrls: string[],
    ): Promise<PackageEntity>;

    deletePackage(id: string): Promise<boolean>;
  
    findPackagesByFilters(category?: string, city?: string): Promise<PackageEntity[]>;

    findPackagesByVendor(id: string): Promise<PackageEntity[]>;
};