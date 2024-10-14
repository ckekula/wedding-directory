import { Module } from '@nestjs/common';
import { PackageResolver } from 'src/graphql/resolvers/package.resolver';
import { PackageService } from './package.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageEntity } from 'src/database/entities/package.entity';
import { VendorEntity } from 'src/database/entities/vendor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PackageEntity, 
      VendorEntity
    ])
  ],
  providers: [PackageResolver, PackageService],
  exports: [PackageService]
})
export class PackageModule {}
