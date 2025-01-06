import { Injectable } from '@nestjs/common';
import { ReviewEntity } from 'src/database/entities/review.entity';
import { OfferingEntity } from "src/database/entities/offering.entity";
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRepository } from 'src/database/repositories/review.repository';
import { ReviewRepositoryType } from 'src/database/types/reviewTypes';
import { CreateReviewInput } from 'src/graphql/inputs/createReview.input';

@Injectable()
export class ReviewService {
  private reviewRepository: ReviewRepositoryType
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(OfferingEntity)
    private readonly offeringRepository: Repository<OfferingEntity>,

  ) {
    this.reviewRepository = ReviewRepository(this.dataSource);
  }

  async createReview(input: CreateReviewInput): Promise<ReviewEntity> {
    const review = this.reviewRepository.create(input);
    return await this.reviewRepository.save(review);
  }

  async deleteReview(id: string): Promise<boolean> {
    return this.reviewRepository.deleteReview(id);
  }

  async findReviewsByOffering(offeringId: string): Promise<ReviewEntity[]> {
    return this.reviewRepository.findReviewsByOffering(offeringId);
  }
}
