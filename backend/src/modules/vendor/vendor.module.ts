import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorService } from './vendor.service';
import { VendorResolver } from 'src/graphql/resolvers/vendor.resolver';
import { VendorRepository } from 'src/database/repositories/vendor.repository';

@Module({
    imports: [TypeOrmModule.forFeature([
      VendorRepository
    ])],
    providers: [
      VendorService,
      VendorResolver
    ],
})

export class VendorModule {}