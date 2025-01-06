import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { VisitorEntity } from './visitor.entity';
import { BudgetItemEntity } from './budget_item.entity';

@Entity({ name: 'budget_tool' })
export class BudgetToolEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  totalBudget?: number;

  @OneToOne(() => VisitorEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'visitorId' })
  visitor: VisitorEntity;

  @OneToMany(() => BudgetItemEntity, (item) => item.budgetTool, { cascade: true })
  budgetItems: BudgetItemEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
