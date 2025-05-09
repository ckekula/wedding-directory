import { Module } from '@nestjs/common';
import { VectorSearchService } from './vector-search.service';
import { EmbeddingsModule } from './embeddings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorEntity } from '../../database/entities/vendor.entity';
import { OfferingEntity } from '../../database/entities/offering.entity';
import { PackageEntity } from '../../database/entities/package.entity';

@Module({
  imports: [
    EmbeddingsModule,
    TypeOrmModule.forFeature([
        VendorEntity,
        OfferingEntity,
        PackageEntity
    ])
  ],
  providers: [VectorSearchService],
  exports: [VectorSearchService],
})
export class VectorSearchModule {}