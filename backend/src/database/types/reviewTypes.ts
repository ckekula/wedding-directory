import { ReviewEntity } from "../entities/review.entity";
import { Repository } from "typeorm";

export type ReviewRepositoryType = Repository<ReviewEntity> & {
    createReview(createReviewInput: Partial<ReviewEntity>): Promise<ReviewEntity>;

    deleteReview(id: string): Promise<boolean>;

    findReviewsByOffering(id: string): Promise<ReviewEntity[]>;
};