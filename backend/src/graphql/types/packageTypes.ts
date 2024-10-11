import { PackageEntity } from "src/database/entities/package.entity";
import { VendorEntity } from "src/database/entities/vendor.entity";
import { Repository } from "typeorm";

export type VendorRepositoryType = Repository<VendorEntity> & {
    findVendorById(id: string): Promise<VendorEntity | null>;
    findAllVendors(): Promise<VendorEntity[]>;
};

export type PackageRepositoryType = Repository<PackageEntity> & {
    createPackage(
      createPackageInput: Partial<PackageEntity>,
      vendor: VendorEntity,
      mediaUrls: string[],
    ): Promise<PackageEntity>;
  
    findPackagesByFilters(category?: string, city?: string): Promise<PackageEntity[]>;
};