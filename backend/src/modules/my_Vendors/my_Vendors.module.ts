import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyVendorsService } from './my_Vendors.service';
import { MyVendorsResolver } from 'src/graphql/resolvers/myVendors.resolver';
import { MyVendorsEntity } from 'src/database/entities/my_Vendors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MyVendorsEntity])],
  providers: [MyVendorsService, MyVendorsResolver],
})
export class MyVendorsModule {}
