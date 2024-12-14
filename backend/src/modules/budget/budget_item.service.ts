import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BudgetItemEntity } from '../../database/entities/budget_item.entity';
import { BudgetToolEntity } from '../../database/entities/budget_tool.entity';
import { CreateBudgetItemInput } from '../../graphql/inputs/createBudgetItem.input';
import { UpdateBudgetItemInput } from '../../graphql/inputs/updateBudgetItem.input';

@Injectable()
export class BudgetItemService {
  constructor(
    @InjectRepository(BudgetItemEntity)
    private readonly budgetItemRepository: Repository<BudgetItemEntity>,

    @InjectRepository(BudgetToolEntity)
    private readonly budgetToolRepository: Repository<BudgetToolEntity>,
  ) {}

  async create(input: CreateBudgetItemInput): Promise<BudgetItemEntity> {
    // Find the BudgetTool entity using the provided budgetToolId
    const budgetTool = await this.budgetToolRepository.findOneBy({ id: input.budgetToolId });

    if (!budgetTool) {
      throw new Error('BudgetTool not found');
    }

    // Create a new BudgetItem entity and associate it with the BudgetTool
    const newBudgetItem = this.budgetItemRepository.create({
      ...input,
      budgetTool,
    });

    // Save the BudgetItem entity
    return this.budgetItemRepository.save(newBudgetItem);
  }

  async findByBudgetToolId(budgetToolId: string): Promise<BudgetItemEntity[]> {
    return this.budgetItemRepository.find({
      where: { budgetTool: { id: budgetToolId } },
      relations: ['budgetTool'], // Ensure relations are fetched
    });
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
