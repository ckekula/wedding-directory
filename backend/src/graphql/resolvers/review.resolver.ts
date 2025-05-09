import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ReviewService } from "../../modules/review/review.service";
import { ReviewModel } from "../models/review.model";
import { ReviewEntity } from "../../database/entities/review.entity";
import { Query } from "@nestjs/graphql";
import { CreateReviewInput } from "../inputs/createReview.input";

@Resolver()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(() => ReviewModel)
  async createReview(
    @Args('input') input: CreateReviewInput,
  ): Promise<ReviewEntity> {
    return this.reviewService.createReview(input);
  }

  @Mutation(() => Boolean)
  async deleteReview(@Args('id') id: string): Promise<boolean> {
    return this.reviewService.deleteReview(id);
  }

  @Query(() => [ReviewModel])
  async findReviewsByOffering(
    @Args('offering_id') offeringId: string,
  ): Promise<ReviewEntity[]> {
    return this.reviewService.findReviewsByOffering(offeringId);
  }
}
