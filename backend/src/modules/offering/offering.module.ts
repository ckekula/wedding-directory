import { Module } from '@nestjs/common';
import { OfferingResolver } from 'src/graphql/resolvers/offering.resolver';
import { OfferingService } from './offering.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorEntity } from 'src/database/entities/vendor.entity';
import { OfferingEntity } from 'src/database/entities/offering.entity';
import { ReviewService } from '../review/review.service';
import { VisitorEntity } from 'src/database/entities/visitor.entity';
import { ReviewEntity } from 'src/database/entities/review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OfferingEntity, 
      VendorEntity,
      VisitorEntity,
      ReviewEntity
    ])
  ],
  providers: [OfferingResolver, OfferingService, ReviewService],
  exports: [OfferingService]
})
export class OfferingModule {}