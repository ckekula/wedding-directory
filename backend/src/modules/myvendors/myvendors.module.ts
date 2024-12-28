import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyVendorsService } from './myVendors.service';
import { MyVendorsResolver } from 'src/graphql/resolvers/myVendors.resolver';
import { MyVendorsEntity } from 'src/database/entities/myVendors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MyVendorsEntity])],
  providers: [MyVendorsService, MyVendorsResolver],
})
export class MyVendorsModule {}
