import { DataSource } from 'typeorm';
import { ChecklistEntity } from '../entities/checklist.entity';
import { VisitorEntity } from '../entities/visitor.entity';
import { ChecklistRepositoryType } from '../types/checklistTypes';

// Use the DataSource to get the base repository and extend it
export const ChecklistRepository = (
  dataSource: DataSource,
): ChecklistRepositoryType =>
  dataSource.getRepository(ChecklistEntity).extend({
    /**
     * Create a new checklist for a visitor.
     */
    async createChecklist(
      createChecklistInput: Partial<ChecklistEntity>,
      visitor: VisitorEntity,
    ): Promise<ChecklistEntity> {
      const checklist = this.create({
        ...createChecklistInput,
        visitor,
      });
      return this.save(checklist);
    },

    /**
     * Update an existing checklist by ID.
     */
    async updateChecklist(
      id: string,
      updateChecklistInput: Partial<ChecklistEntity>,
    ): Promise<ChecklistEntity> {
      const checklist = await this.findOne({ where: { id } });
      if (!checklist) {
        throw new Error('Checklist not found');
      }
      return this.save({
        ...checklist,
        ...updateChecklistInput,
      });
    },

    /**
     * Delete a checklist by ID.
     */
    async deleteChecklist(id: string): Promise<boolean> {
      const result = await this.delete({ id });
      return result.affected > 0;
    },

    /**
     * Find a checklist by its ID.
     */
    async findChecklistById(id: string): Promise<ChecklistEntity> {
      return this.findOne({
        where: { id },
        relations: ['visitor'], // Include visitor relationship
      });
    },

    /**
     * Find all checklists for a specific visitor.
     */
    async findChecklistsByVisitor(
      visitorId: string,
    ): Promise<ChecklistEntity[]> {
      return this.createQueryBuilder('checklist')
        .leftJoinAndSelect('checklist.visitor', 'visitor') // Include visitor details
        .where('visitor.id = :visitorId', { visitorId })
        .getMany();
    },
  });
