import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetToolService } from './budget_tool.service';
import { BudgetToolResolver } from '../../graphql/resolvers/budget_tool.resolver';
import { BudgetToolEntity } from '../../database/entities/budget_tool.entity';
import { VisitorModule } from '../visitor/visitor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BudgetToolEntity]),
    VisitorModule,
  ],
  providers: [BudgetToolService, BudgetToolResolver],
  exports: [TypeOrmModule, BudgetToolService], // Exporting TypeOrmModule to share BudgetToolEntityRepository
})
export class BudgetToolModule {}
