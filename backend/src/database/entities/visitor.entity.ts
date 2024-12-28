import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne
} from 'typeorm';
import { ReviewEntity } from './review.entity';
import { BudgetToolEntity } from './budget_tool.entity';
import { ChecklistEntity } from './checklist.entity';
import { MyVendorsEntity } from './myVendors.entity';

@Entity({ name: 'visitor' })
export class VisitorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  visitor_fname?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  visitor_lname?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  partner_fname?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  partner_lname?: string;

  @Column({ type: 'varchar', nullable: true })
  engaged_date?: string;

  @Column({ type: 'varchar', nullable: true })
  wed_date?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  wed_venue?: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  profile_pic_url?: string;

  @Column({ type: 'varchar', nullable: true })
  phone?: string;

  @Column({ type: 'varchar', nullable: true })
  city?: string;

  @OneToOne(() => BudgetToolEntity, (budgetTool) => budgetTool.visitor)
  budgetTool: BudgetToolEntity;

  @OneToMany(() => ReviewEntity, (r) => r.visitor)
  reviews: ReviewEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => ChecklistEntity, (c) => c.visitor, {cascade: true})
  checklists: ChecklistEntity[];

  @OneToMany(() => MyVendorsEntity, (m) => m.visitor, {cascade: true})
  myVendors: MyVendorsEntity[];
}
