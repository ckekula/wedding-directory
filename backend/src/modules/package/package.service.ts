import { Injectable, NotFoundException } from "@nestjs/common";
import { PackageEntity } from "../../database/entities/package.entity";
import { PackageRepository } from "../../database/repositories/package.repository";
import { PackageRepositoryType } from "../../database/types/packageTypes";
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

  async deletePackage(id: string): Promise<boolean> {
    try {
      const OfferingPackage = await this.packageRepository.findOne({ where: { id } });
      if (!OfferingPackage) {
        throw new NotFoundException(`Package with ID ${id} not found`);
      }
      
      await this.packageRepository.remove(OfferingPackage);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete package: ${error.message}`);
    }
  }

  async findPackageByOffering(offeringId: string): Promise<PackageEntity[]> {
    return this.packageRepository.findPackageByOffering(offeringId);
  }
}