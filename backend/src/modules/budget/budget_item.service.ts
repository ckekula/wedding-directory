import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBudgetItemInput } from '../../graphql/inputs/createBudgetItem.input';
import { UpdateBudgetItemInput } from '../../graphql/inputs/updateBudgetItem.input';
import { BudgetItemEntity } from '../../database/entities/budget_item.entity';


@Injectable()
export class BudgetItemService {
  constructor(
    @InjectRepository(BudgetItemEntity)
    private readonly budgetItemRepository: Repository<BudgetItemEntity>,
  ) {}

  async findByBudgetToolId(budgetToolId: string): Promise<BudgetItemEntity[]> {
    return this.budgetItemRepository.find({
      where: { budgetTool: { id: budgetToolId } },
    });
  }

  async create(input: CreateBudgetItemInput): Promise<BudgetItemEntity> {
    const newBudgetItem = this.budgetItemRepository.create(input);
    return this.budgetItemRepository.save(newBudgetItem);
  }

  async update(id: string, input: UpdateBudgetItemInput): Promise<BudgetItemEntity> {
    await this.budgetItemRepository.update(id, input);
    return this.budgetItemRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.budgetItemRepository.delete(id);
    return result.affected > 0;
  }
}
