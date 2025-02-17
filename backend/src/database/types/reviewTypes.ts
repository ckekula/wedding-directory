import { OfferingEntity } from "../entities/offering.entity";
import { ReviewEntity } from "../entities/review.entity";
import { Repository } from "typeorm";
import { VisitorEntity } from "../entities/visitor.entity";

export type ReviewRepositoryType = Repository<ReviewEntity> & {
  createReview(
    createReviewInput: Partial<ReviewEntity>,
    offering: OfferingEntity,
    visitor: VisitorEntity,
  ): Promise<ReviewEntity>;

  deleteReview(id: string): Promise<boolean>;

  findReviewById(id: string): Promise<ReviewEntity | null>;

  findReviewsByOffering(id: string): Promise<ReviewEntity[]>;
};
