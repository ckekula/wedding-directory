import { DataSource } from "typeorm";
import { PackageEntity } from "../entities/package.entity";
import { OfferingEntity } from '../entities/offering.entity';

export const PackageRepository = (dataSource: DataSource) =>
  dataSource.getRepository(PackageEntity).extend({

    async createPackage(
      input: Partial<PackageEntity>,
      offeringId: string
    ): Promise<PackageEntity> {

      const offering = await dataSource.getRepository(OfferingEntity).findOne({ where: { id: offeringId } });

      if (!offering) {
        throw new Error("No offering found");
      }

      const _package = this.create({ ...input, offering });
      return this.save(_package);
    },

    async updatePackage(input: Partial<PackageEntity>): Promise<PackageEntity> {
      const { id } = input;
      if (!id) {
        throw new Error("Package ID is required for update");
      }
      const _package = await this.findOne({ where: { id } });

      if (!_package) {
        throw new Error(`Package with id ${id} not found`);
      }

      return this.save({
        ..._package,
        ...input,
      });
    },

    async deletePackage(id: string): Promise<PackageEntity> {
        const _package = await this.findOne({ where: { id } });

        if (!_package) {
          throw new Error(`Package with id ${id} not found`);
        }

        await this.remove(_package);
        return _package;
    },

    async findPackageByOffering(offeringId: string): Promise<PackageEntity[]> {
        return this.find({
          where: { offering: { id: offeringId } },
          relations: ['offering'],
        });
    }
        
  });