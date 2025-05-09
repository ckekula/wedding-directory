import { Module } from '@nestjs/common';
import { EmbeddingsService } from './embeddings.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorEntity } from '../../database/entities/vendor.entity';
import { OfferingEntity } from '../../database/entities/offering.entity';
import { PackageEntity } from '../../database/entities/package.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([VendorEntity, OfferingEntity, PackageEntity])],
  providers: [EmbeddingsService],
  exports: [EmbeddingsService],
})
export class EmbeddingsModule {}