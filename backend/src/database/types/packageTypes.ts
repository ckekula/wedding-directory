import { Repository } from "typeorm";
import { PackageEntity } from "../entities/package.entity";

export type PackageRepositoryType = Repository<PackageEntity> & {
    createPackage: (input: Partial<PackageEntity>, offering_id: string) => Promise<PackageEntity>;
    updatePackage: (id: string, input: Partial<PackageEntity>) => Promise<PackageEntity>;
    deletePackage: (id: string) => Promise<PackageEntity>;
    findPackageByOffering: (offering_id: string) => Promise<PackageEntity[]>;
}