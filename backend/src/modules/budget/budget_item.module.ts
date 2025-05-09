import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetItemService } from './budget_item.service';
import { BudgetItemResolver } from '../../graphql/resolvers/budget_item.resolver';
import { BudgetItemEntity } from '../../database/entities/budget_item.entity';
import { BudgetToolModule } from './budget_tool.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BudgetItemEntity]),
    BudgetToolModule, // Importing BudgetToolModule correctly
  ],
  providers: [BudgetItemService, BudgetItemResolver],
  exports: [BudgetItemService],
})
export class BudgetItemModule {}
