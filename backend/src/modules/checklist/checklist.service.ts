import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChecklistEntity } from '../../database/entities/checklist.entity';
import { Repository } from 'typeorm';
import { CreateChecklistInput } from '../../graphql/inputs/createChecklistInput';
import { UpdateChecklistInput } from '../../graphql/inputs/updateChecklistInput';

@Injectable()
export class ChecklistService {
  constructor(
    @InjectRepository(ChecklistEntity)
    private readonly checklistRepository: Repository<ChecklistEntity>,
  ) {}

  async getByVisitor(visitorId: string): Promise<ChecklistEntity[]> {
    return this.checklistRepository.find({
      where: { visitor: { id: visitorId } },
    });
  }

  async create(input: CreateChecklistInput): Promise<ChecklistEntity> {
    const checklist = this.checklistRepository.create({
      ...input,
      due_date: new Date(input.due_date),
      visitor: { id: input.visitorId },
    });
    return this.checklistRepository.save(checklist);
  }

  async update(input: UpdateChecklistInput): Promise<ChecklistEntity> {
    const checklist = await this.checklistRepository.findOne({ where: { id: input.id } });
    if (!checklist) throw new NotFoundException('Checklist not found');

    Object.assign(checklist, input);
    if (input.due_date) checklist.due_date = new Date(input.due_date);

    return this.checklistRepository.save(checklist);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.checklistRepository.delete(id);
    return result.affected > 0;
  }
}
