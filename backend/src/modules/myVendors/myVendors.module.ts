import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyVendorsService } from './myVendors.service';
import { MyVendorsResolver } from '../../graphql/resolvers/myVendors.resolver';
import { MyVendorsEntity } from '../../database/entities/myVendors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MyVendorsEntity])],
  providers: [MyVendorsService, MyVendorsResolver],
})
export class MyVendorsModule {}
