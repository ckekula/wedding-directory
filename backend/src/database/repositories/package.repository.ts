import { DataSource } from "typeorm";
import { PackageRepositoryType } from "../types/packageTypes";
import { PackageEntity } from "../entities/package.entity";

export const PackageRepository = (dataSource: DataSource): PackageRepositoryType =>
  dataSource.getRepository(PackageEntity).extend({

    async createPackage(
        input: Partial<PackageEntity>,
      ): Promise<PackageEntity> {
        const packageEntity = this.create(input);
        return this.save(packageEntity);
    },

    async updatePackage(input: Partial<PackageEntity>): Promise<PackageEntity> {
      const packageEntity = await this.findOne({ where: { id: input.id } });
  
      if (!packageEntity) {
        throw new Error(`Package with id ${input.id} not found`);
      }
    
      return this.save({
        ...packageEntity,
        ...input,
      });
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