import { DataSource } from 'typeorm';
import { MyVendorsEntity } from '../entities/myVendors.entity';
import { OfferingEntity } from '../entities/offering.entity';

export const MyVendorsRepository = (dataSource: DataSource) =>
  dataSource.getRepository(MyVendorsEntity).extend({

    async findAllMyVendorsByCategory(visitorId: string, category: string) {
      const results = await this.createQueryBuilder('myVendors')
        .innerJoinAndSelect('myVendors.offering', 'offering')
        .innerJoinAndSelect('offering.vendor', 'vendor')
        .where('myVendors.visitor.id = :visitorId', { visitorId })
        .andWhere('offering.category = :category', { category })
        .getMany();
      
      return results;
    },

    async findAllMyVendors(visitorId: string) {
      return this.createQueryBuilder('myVendors')
          .innerJoinAndSelect('myVendors.offering', 'offering')
          .innerJoinAndSelect('offering.vendor', 'vendor')
          .where('myVendors.visitor.id = :visitorId', { visitorId })
          .orderBy('myVendors.createdAt', 'DESC')
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
      const myVendor = await this.findMyVendorById(visitorId, offeringId);
      
      if (!myVendor) {
        throw new Error("MyVendor relationship not found");
      }
    
      await this.delete({
        visitor: { id: visitorId },
        offering: { id: offeringId }
      });
    
      return myVendor;
    }
  });
