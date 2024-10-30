// import { Module } from '@nestjs/common';
// import { ReviewResolver } from 'src/graphql/resolvers/review.resolver';
// import { ReviewService } from './review.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ReviewEntity } from 'src/database/entities/review.entity';
// import { OfferingEntity } from 'src/database/entities/offering.entity';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([
//         ReviewEntity, 
//       OfferingEntity
//     ])
//   ],
//   providers: [ReviewResolver, ReviewService],
//   exports: [ReviewService]
// })

// export class ReviewModule {}