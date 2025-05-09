import { Module } from '@nestjs/common';
import { VectorSearchService } from './vector-search.service';
import { EmbeddingsModule } from './embeddings.module';
import { TypeOrmModule } from 'node_modules/@nestjs/typeorm';
import { VendorEntity } from 'src/database/entities/vendor.entity';
import { OfferingEntity } from 'src/database/entities/offering.entity';
import { PackageEntity } from 'src/database/entities/package.entity';

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