import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitorService } from './visitor.service';
import { VisitorResolver } from '../../graphql/resolvers/visitor.resolver';
import { VisitorEntity } from '../../database/entities/visitor.entity';
import { ChecklistModule } from '../checklist/checklist.module';

@Module({
  imports: [TypeOrmModule.forFeature([VisitorEntity]),ChecklistModule],
  providers: [VisitorService, VisitorResolver],
  exports: [VisitorService],
})
export class VisitorModule {}
