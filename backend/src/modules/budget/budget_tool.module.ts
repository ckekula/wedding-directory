import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetToolService } from './budget_tool.service';
import { BudgetToolResolver } from '../../graphql/resolvers/budget_tool.resolver';
import { BudgetToolEntity } from 'src/database/entities/budget_tool.entity';
import { BudgetItemEntity } from 'src/database/entities/budget_item.entity';
import { VisitorModule } from '../visitor/visitor.module';


@Module({
  imports: [TypeOrmModule.forFeature([BudgetToolEntity, BudgetItemEntity]), VisitorModule],
  providers: [BudgetToolService, BudgetToolResolver],
  exports: [BudgetToolService],
})
export class BudgetToolModule {}
