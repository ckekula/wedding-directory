import { DataSource } from 'typeorm';
import { ReviewEntity } from '../entities/review.entity';
import { ReviewRepositoryType } from '../types/reviewTypes';
import { OfferingEntity } from '../entities/offering.entity';
import { VisitorEntity } from '../entities/visitor.entity';

// Use the DataSource to get the base repository and extend it
export const ReviewRepository = (dataSource: DataSource): ReviewRepositoryType =>
  dataSource.getRepository(ReviewEntity).extend({

    async createReview(input: Partial<ReviewEntity>): Promise<ReviewEntity> {
      const { offering, visitor, ...reviewData } = input;
    
      // Ensure offering and visitor are fetched before creating the review
      const offeringEntity = await this.manager.findOneBy(OfferingEntity, { id: offering?.id });
      if (!offeringEntity) {
        throw new Error(`Offering with ID ${offering?.id} not found.`);
      }
    
      const visitorEntity = await this.manager.findOneBy(VisitorEntity, { id: visitor?.id });
      if (!visitorEntity) {
        throw new Error(`Visitor with ID ${visitor?.id} not found.`);
      }
    
      // Create the review with resolved relationships
      const review = this.create({
        ...reviewData,
        offering: offeringEntity,
        visitor: visitorEntity,
      });
    
      return await this.save(review);
    },

    async deleteReview(id: string): Promise<boolean> {
      const result = await this.delete(id);
      return result.affected > 0;
    },

    async findReviewsByOffering(offeringId: string): Promise<ReviewEntity[]> {
      return await this.find({
        where: { offering: { id: offeringId } },
        relations: ['visitor', 'offering'],
      });
    },
  });
