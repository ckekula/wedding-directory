import { DataSource } from 'typeorm';
import { MyVendorsEntity } from '../entities/myvendors.entity';
import { OfferingEntity } from '../entities/offering.entity';

export const MyVendorsRepository = (dataSource: DataSource) =>
  dataSource.getRepository(MyVendorsEntity).extend({
    async findAllByVisitorAndCategory(visitorId: string, category: string) {
      // Find all offerings for a visitor in a specific category
      return this.createQueryBuilder('myVendors')
        .innerJoinAndSelect('myVendors.offering', 'offering')
        .where('myVendors.visitor.id = :visitorId', { visitorId })
        .andWhere('offering.category = :category', { category })
        .getMany();
    },

    async addToMyVendors(visitorId: string, category: string) {
      // Find offerings by category
      const offering = await this.manager.findOne(OfferingEntity, { where: { category } });

      if (!offering) {
        throw new Error(`No offering found for category: ${category}`);
      }

      // Create and save the new myVendors entity
      const myVendors = this.create({
        visitor: { id: visitorId }, // Pass only the visitor's ID
        offering: offering,
      });

      return this.save(myVendors);
    },

    async removeFromMyVendors(visitorId: string, category: string) {
      // Find the vendor entries to delete
      const myVendorsToRemove = await this.createQueryBuilder('myVendors')
        .innerJoinAndSelect('myVendors.offering', 'offering')
        .where('myVendors.visitor.id = :visitorId', { visitorId })
        .andWhere('offering.category = :category', { category })
        .getMany();

      // Delete entries
      await this.remove(myVendorsToRemove);

      return myVendorsToRemove;
    },
  });
