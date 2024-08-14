import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitorService } from './visitor.service';
import { VisitorResolver } from 'src/graphql/resolvers/visitor.resolver';
import { VisitorEntity } from 'src/database/entities/visitor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VisitorEntity])],
  providers: [VisitorService, VisitorResolver],
})
export class VisitorModule {}
