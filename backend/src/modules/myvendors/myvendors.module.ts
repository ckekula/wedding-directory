import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyVendorsService } from './myvendors.service';
import { MyVendorsResolver } from 'src/graphql/resolvers/myvendors.resolver';
import { MyVendorsEntity } from 'src/database/entities/myvendors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MyVendorsEntity])],
  providers: [MyVendorsService, MyVendorsResolver],
})
export class MyVendorsModule {}
