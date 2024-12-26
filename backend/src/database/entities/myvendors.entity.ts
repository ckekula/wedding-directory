import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { VisitorEntity } from './visitor.entity';
import { OfferingEntity } from './offering.entity';

@Entity({ name: 'checklist' })
export class MyVendorsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => OfferingEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'offering_id' })
  offering: OfferingEntity;

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