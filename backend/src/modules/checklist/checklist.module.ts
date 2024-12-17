import { Module } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { ChecklistResolver } from '../../graphql/resolvers/checklist.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChecklistEntity } from '../../database/entities/checklist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChecklistEntity])],
  providers: [ChecklistService, ChecklistResolver],
})
export class ChecklistModule {}
