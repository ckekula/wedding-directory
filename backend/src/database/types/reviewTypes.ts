import { ReviewEntity } from "../entities/review.entity";
import { OfferingEntity } from "src/database/entities/offering.entity";
import { Repository } from "typeorm";

export type ReviewRepositoryType = Repository<ReviewEntity> & {
    createReview(
      createReviewInput: Partial<ReviewEntity>,
      review: OfferingEntity,
    ): Promise<ReviewEntity>;

    deleteReview(id: string): Promise<boolean>;

    findReviewById(id: string): Promise<ReviewEntity>;
  
    findReviewsByFilters(category?: string, city?: string): Promise<ReviewEntity[]>;

    findReviewsByOffering(id: string): Promise<ReviewEntity[]>;
};