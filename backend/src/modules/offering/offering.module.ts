import { Module } from '@nestjs/common';
import { OfferingResolver } from 'src/graphql/resolvers/offering.resolver';
import { OfferingService } from './offering.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorEntity } from 'src/database/entities/vendor.entity';
import { OfferingEntity } from 'src/database/entities/offering.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        OfferingEntity, 
      VendorEntity
    ])
  ],
  providers: [OfferingResolver, OfferingService],
  exports: [OfferingService]
})

export class OfferingModule {}