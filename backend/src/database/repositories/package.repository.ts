import { DataSource } from "typeorm";
import { PackageRepositoryType } from "../types/packageTypes";
import { PackageEntity } from "../entities/package.entity";
import { OfferingEntity } from "../entities/offering.entity";

export const PackageRepository = (dataSource: DataSource): PackageRepositoryType =>
  dataSource.getRepository(PackageEntity).extend({

    async createPackage(
        input: Partial<PackageEntity>,
        offeringId: string
      ): Promise<PackageEntity> {
        const offering = await this.manager.findOne(OfferingEntity, { where: { id: offeringId } });
      
        if (!offering) {
          throw new Error(`Offering with id ${offeringId} not found`);
        }
      
        const packageEntity = this.create({
          ...input,
          offering,
        });
      
        return this.save(packageEntity);
    },

    async updatePackage(id: string, input: Partial<PackageEntity>): Promise<PackageEntity> {
        const packageEntity = await this.findOne({ where: { id } });
      
        if (!packageEntity) {
          throw new Error(`Package with id ${id} not found`);
        }
      
        Object.assign(packageEntity, input);
        return this.save(packageEntity);
    },

    async deletePackage(id: string): Promise<PackageEntity> {
        const packageEntity = await this.findOne({ where: { id } });
      
        if (!packageEntity) {
          throw new Error(`Package with id ${id} not found`);
        }
      
        await this.remove(packageEntity);
        return packageEntity;
    },  

    async findPackageByOffering(offeringId: string): Promise<PackageEntity[]> {
        return this.find({
          where: { offering: { id: offeringId } },
          relations: ['offering'],
        });
    }
        
  });