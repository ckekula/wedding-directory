import { Repository } from 'typeorm';
import { ChecklistEntity } from '../entities/checklist.entity';
import { VisitorEntity } from '../entities/visitor.entity';

/**
 * Custom repository type for checklist operations.
 */
export type ChecklistRepositoryType = Repository<ChecklistEntity> & {
  /**
   * Create a new checklist for a visitor.
   */
  createChecklist(
    createChecklistInput: Partial<ChecklistEntity>,
    visitor: VisitorEntity,
  ): Promise<ChecklistEntity>;

  /**
   * Update an existing checklist by ID.
   */
  updateChecklist(
    id: string,
    updateChecklistInput: Partial<ChecklistEntity>,
  ): Promise<ChecklistEntity>;

  /**
   * Delete a checklist by ID.
   */
  deleteChecklist(id: string): Promise<boolean>;

  /**
   * Find a checklist by its ID.
   */
  findChecklistById(id: string): Promise<ChecklistEntity>;

  /**
   * Find all checklists for a specific visitor.
   */
  findChecklistsByVisitor(visitorId: string): Promise<ChecklistEntity[]>;
};
