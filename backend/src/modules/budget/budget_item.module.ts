import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetItemService } from './budget_item.service';
import { BudgetItemResolver } from '../../graphql/resolvers/budget_item.resolver';
import { BudgetItemEntity } from 'src/database/entities/budget_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BudgetItemEntity])],
  providers: [BudgetItemService, BudgetItemResolver],
  exports: [BudgetItemService],
})
export class BudgetItemModule {}
