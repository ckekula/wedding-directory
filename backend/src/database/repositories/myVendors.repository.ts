import { DataSource } from 'typeorm';
import { MyVendorsEntity } from '../entities/myVendors.entity';
import { OfferingEntity } from '../entities/offering.entity';

export const MyVendorsRepository = (dataSource: DataSource) =>
  dataSource.getRepository(MyVendorsEntity).extend({
    async findAllMyVendorsByCategory(visitorId: string, category: string) {
      // Find all offerings for a visitor in a specific category
      return this.createQueryBuilder('myVendors')
        .innerJoinAndSelect('myVendors.offering', 'offering')
        .where('myVendors.visitor.id = :visitorId', { visitorId })
        .andWhere('offering.category = :category', { category })
        .getMany();
    },
  
    async findMyVendorById(visitorId: string, offeringId: string) {
      // Query to find a specific offering in the visitor's My Vendors list
      const myVendor = await this.createQueryBuilder('myVendors')
        .innerJoinAndSelect('myVendors.offering', 'offering') // Join with the offering table
        .where('myVendors.visitor.id = :visitorId', { visitorId }) // Filter by visitor ID
        .andWhere('offering.id = :offeringId', { offeringId }) // Filter by offering ID
        .getOne(); // Retrieve a single matching record
    
      // If no result is found, return null or throw an error
      if (!myVendor) {
        return null;
      }
    
      return myVendor;
    },

    async addToMyVendors(visitorId: string, offeringId: string) {
      const offering = await this.manager.findOne(OfferingEntity, { where: { id: offeringId } });

      if (!offering) {
        throw new Error("No offering found");
      }

      // Create and save the new myVendors entity
      const myVendors = this.create({
        visitor: { id: visitorId }, // Pass only the visitor's ID
        offering: offering,
      });

      return this.save(myVendors);
    },

    async removeFromMyVendors(visitorId: string, offeringId: string) {
      // Find the vendor entries to delete
      const myVendorsToRemove = await this.createQueryBuilder('myVendors')
        .innerJoinAndSelect('myVendors.offering', 'offering')
        .where('myVendors.visitor.id = :visitorId', { visitorId })
        .andWhere('offering.id = :offeringId', { offeringId })
        .getMany();

      // Delete entries
      await this.remove(myVendorsToRemove);

      return myVendorsToRemove;
    },
  });
