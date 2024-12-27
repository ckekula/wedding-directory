import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BudgetToolEntity } from '../../database/entities/budget_tool.entity';
import { CreateBudgetToolInput } from '../../graphql/inputs/createBudgetTool.input';
import { UpdateBudgetToolInput } from '../../graphql/inputs/updateBudgetTool.input';
import { BudgetItemEntity } from '../../database/entities/budget_item.entity';
import { VisitorService } from '../visitor/visitor.service';

@Injectable()
export class BudgetToolService {
  constructor(
    @InjectRepository(BudgetToolEntity)
    private readonly budgetToolRepository: Repository<BudgetToolEntity>,
    private readonly visitorService: VisitorService,
  ) {}

  async findByVisitorId(visitorId: string): Promise<BudgetToolEntity | null> {
    const budgetTool = await this.budgetToolRepository.findOne({
      where: { visitor: { id: visitorId } },
      relations: ['budgetItems', 'visitor'],
    });

    return budgetTool || null;
  }


  async create(input: CreateBudgetToolInput): Promise<BudgetToolEntity> {
    const { visitorId } = input;

    // Find the visitor using the visitorId
    const visitor = await this.visitorService.findVisitorById(visitorId);
    if (!visitor) {
    // Throw a specific exception if visitor is not found
    throw new NotFoundException('Visitor not found');
  }
  // Create the new BudgetTool entity from the input
  const newBudgetTool = this.budgetToolRepository.create(input);
  // Associate the found visitor with the new BudgetTool entity
  newBudgetTool.visitor = visitor;
  // Save and return the new entity
  return this.budgetToolRepository.save(newBudgetTool);
  }


  async update(id: string, input: UpdateBudgetToolInput): Promise<BudgetToolEntity> {
    await this.budgetToolRepository.update(id, input);
    const updated = await this.budgetToolRepository.findOne({ where: { id } });
    if (!updated) {
      throw new NotFoundException(`Budget tool with ID ${id} not found`);
    }
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.budgetToolRepository.delete(id);
    return result.affected > 0;
  }

  async getBudgetItems(budgetToolId: string): Promise<BudgetItemEntity[]> {
    const budgetTool = await this.budgetToolRepository.findOne({
      where: { id: budgetToolId },
      relations: ['budgetItems'],
    });
    return budgetTool?.budgetItems || [];
  }

}
