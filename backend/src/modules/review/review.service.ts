import { Injectable } from '@nestjs/common';
import { ReviewEntity } from 'src/database/entities/review.entity';
import { DataSource } from 'typeorm';
import { ReviewRepository } from 'src/database/repositories/review.repository';
import { ReviewRepositoryType } from 'src/database/types/reviewTypes';
import { CreateReviewInput } from 'src/graphql/inputs/createReview.input';

@Injectable()
export class ReviewService {
  private reviewRepository: ReviewRepositoryType
  constructor(
    private readonly dataSource: DataSource,

  ) {
    this.reviewRepository = ReviewRepository(this.dataSource);
  }

  async createReview(input: CreateReviewInput): Promise<ReviewEntity> {
    return await this.reviewRepository.createReview(input);
  }

  async deleteReview(id: string): Promise<boolean> {
    return this.reviewRepository.deleteReview(id);
  }

  async findReviewsByOffering(offeringId: string): Promise<ReviewEntity[]> {
    return this.reviewRepository.findReviewsByOffering(offeringId);
  }
}
