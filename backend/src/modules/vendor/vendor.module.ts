import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorService } from './vendor.service';
import { VendorResolver } from '../../graphql/resolvers/vendor.resolver';
import { VendorRepository } from '../../database/repositories/vendor.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
      TypeOrmModule.forFeature([VendorRepository]),
      HttpModule
    ],
    providers: [
      VendorService,
      VendorResolver
    ],
  exports: [VendorService]
})

export class VendorModule {}