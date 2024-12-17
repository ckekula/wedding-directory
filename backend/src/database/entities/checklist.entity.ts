import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { VisitorEntity } from './visitor.entity';

@Entity({ name: 'checklist' })
export class ChecklistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'timestamp' })
  due_date: Date;

  @Column({ type: 'varchar', length: 50 })
  category: string; // Category stored as a string (e.g., "Venue", "Budget", etc.)

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @ManyToOne(() => VisitorEntity, (visitor) => visitor.checklists, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'visitor_id' })
  visitor: VisitorEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
