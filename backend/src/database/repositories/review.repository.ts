// import { DataSource } from 'typeorm';
// import { OfferingEntity } from '../entities/offering.entity';
// import { ReviewEntity } from '../entities/review.entity';
// import { ReviewRepositoryType } from '../types/reviewTypes';

// // Use the DataSource to get the base repository and extend it
// export const ReivewRepository = (dataSource: DataSource): ReviewRepositoryType =>
//   dataSource.getRepository(ReviewEntity).extend({

//     async createReview(
//       createReviewInput: Partial<ReviewEntity>,
//       offering: OfferingEntity,
//     ): Promise<ReviewEntity> {
//       const review = this.create({
//         ...createReviewInput,
//         offering,
//       });
//       return this.save(review);
//     },

//     async deleteReview(id: string): Promise<boolean> {
//       const result = await this.delete({ id });
//       return result.affected > 0;
//     },

//     // async findOfferingsByFilters(category?: string, city?: string): Promise<OfferingEntity[]> {
//     //   const query = this.createQueryBuilder('offering')
//     //     .leftJoinAndSelect('offering.vendor', 'vendor'); // Join with vendor

//     //   if (category) {
//     //     query.andWhere('offering.category = :category', { category });
//     //   }

//     //   if (city) {
//     //     query.andWhere('vendor.city = :city', { city });
//     //   }

//     //   return query.getMany();
//     // },

//     async findReviewsByOffering(id: string): Promise<ReviewEntity[]> {
//       return this.createQueryBuilder('review')
//         .leftJoinAndSelect('review.offering', 'offering') // Include vendor details
//         .where('offering.id = :id', { id })
//         .getMany();
//     }
//   });
