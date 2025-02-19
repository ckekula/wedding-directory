import { Injectable } from "@nestjs/common";
import { PackageEntity } from "src/database/entities/package.entity";
import { PackageRepository } from "src/database/repositories/package.repository";
import { PackageRepositoryType } from "src/database/types/packageTypes";
import { DataSource } from "typeorm";

@Injectable()
export class PackageService {
  private packageRepository: PackageRepositoryType
  constructor(
    private readonly dataSource: DataSource
  ) {
    this.packageRepository = PackageRepository(this.dataSource);
  }

  async createPackage(input: Partial<PackageEntity>, offeringId: string): Promise<PackageEntity> {
    return this.packageRepository.createPackage(input, offeringId);
  }

  async updatePackage(input: Partial<PackageEntity>): Promise<PackageEntity> {
    return this.packageRepository.updatePackage(input);
  }

  async deletePackage(id: string): Promise<PackageEntity> {
    return this.packageRepository.deletePackage(id);
  }

  async findPackageByOffering(offeringId: string): Promise<PackageEntity[]> {
    return this.packageRepository.findPackageByOffering(offeringId);
  }
}