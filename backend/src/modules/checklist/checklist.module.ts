import { Module } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { ChecklistResolver } from '../../graphql/resolvers/checklist.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChecklistEntity } from '../../database/entities/checklist.entity';
import { VisitorEntity } from '../../database/entities/visitor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChecklistEntity,VisitorEntity])],
  providers: [ChecklistService, ChecklistResolver],
  exports: [ChecklistService],
})
export class ChecklistModule {}
