import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BudgetToolEntity } from './budget_tool.entity';

@Entity({ name: 'budget_item' })
export class BudgetItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  itemName: string;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 , nullable: true })
  estimatedCost?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 , nullable: true })
  amountPaid?: number;

  @Column({ type: 'text', nullable: true })
  specialNotes?: string;

  @Column({ type: 'boolean', default: false })
  isPaidInFull: boolean;

  @ManyToOne(() => BudgetToolEntity, (budgetTool) => budgetTool.budgetItems, { onDelete: 'CASCADE' })
  budgetTool: BudgetToolEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
