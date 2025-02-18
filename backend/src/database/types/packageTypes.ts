import { Repository } from "typeorm";
import { PackageEntity } from "../entities/package.entity";

export type PackageRepositoryType = Repository<PackageEntity> & {
    createPackage: (input: Partial<PackageEntity>, offeringId: string) => Promise<PackageEntity>;
    updatePackage: (input: Partial<PackageEntity>) => Promise<PackageEntity>;
    deletePackage: (id: string) => Promise<PackageEntity>;
    findPackageByOffering: (offeringId: string) => Promise<PackageEntity[]>;
}