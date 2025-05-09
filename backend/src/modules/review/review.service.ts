import { Injectable } from '@nestjs/common';
import { ReviewEntity } from '../../database/entities/review.entity';
import { DataSource,Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRepository } from '../../database/repositories/review.repository';
import { ReviewRepositoryType } from '../../database/types/reviewTypes';
import { CreateReviewInput } from '../../graphql/inputs/createReview.input';
import { OfferingEntity } from '../../database/entities/offering.entity';
import { VisitorEntity } from '../../database/entities/visitor.entity';


@Injectable()
export class ReviewService {
  private reviewRepository: ReviewRepositoryType;
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(OfferingEntity)
    private readonly offeringRepository: Repository<OfferingEntity>,
    @InjectRepository(VisitorEntity)
    private readonly visitorRepository: Repository<VisitorEntity>,
  ) {
    this.reviewRepository = ReviewRepository(this.dataSource);
  }

  async createReview(
    createReviewInput: CreateReviewInput,
  ): Promise<ReviewEntity> {
    const offering = await this.offeringRepository.findOne({
      where: { id: createReviewInput.offering_id },
    });

    const visitor = await this.visitorRepository.findOne({
      where: { id: createReviewInput.visitor_id },
    });

    if (!offering) {
      throw new Error('Offering not found');
    }
    if (!visitor) {
      throw new Error('Visitor not found');
    }
    return this.reviewRepository.createReview(
      createReviewInput,
      offering,
      visitor,
    );
  }

  async deleteReview(id: string): Promise<boolean> {
    return this.reviewRepository.deleteReview(id);
  }

  async findReviewById(id: string): Promise<ReviewEntity> {
    return this.reviewRepository.findReviewById(id);
  }

  async findReviewsByOffering(offeringId: string): Promise<ReviewEntity[]> {
    return this.reviewRepository.findReviewsByOffering(offeringId);
  }
}
