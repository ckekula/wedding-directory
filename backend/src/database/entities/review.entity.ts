import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { OfferingEntity } from './offering.entity';
import { VisitorEntity } from './visitor.entity';

@Entity({ name: 'review' })
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  comment?: string;

  @Column({ type: 'integer' })
  rating: number;

  @ManyToOne(() => OfferingEntity, (offering) => offering.review, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'offering_id' })
  offering: OfferingEntity;
  
  @ManyToOne(() => VisitorEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'visitor_id' })
  visitor: VisitorEntity;  

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
