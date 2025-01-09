import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne
  } from 'typeorm';
import { OfferingEntity } from './offering.entity';
import { VisitorEntity } from './visitor.entity';

@Entity({ name: 'review' })
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:'varchar', nullable:true})
  comment?: string;

  @Column({type:'integer'})
  rating: number;

  @ManyToOne(() => OfferingEntity, o => o.review, { onDelete: 'CASCADE' })
  offering: OfferingEntity;

  @ManyToOne(() => VisitorEntity, { onDelete: 'SET NULL' })
  visitor: VisitorEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
