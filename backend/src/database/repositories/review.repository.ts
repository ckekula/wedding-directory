import { DataSource } from 'typeorm';
import { ReviewEntity } from '../entities/review.entity';
import { ReviewRepositoryType } from '../types/reviewTypes';

// Use the DataSource to get the base repository and extend it
export const ReviewRepository = (dataSource: DataSource): ReviewRepositoryType =>
  dataSource.getRepository(ReviewEntity).extend({

    async createReview(input: Partial<ReviewEntity>,): Promise<ReviewEntity> {
      const review = this.create(input);
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
