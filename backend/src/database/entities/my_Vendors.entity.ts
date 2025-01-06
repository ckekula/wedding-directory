import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { VisitorEntity } from './visitor.entity';
import { OfferingEntity } from './offering.entity';

@Entity({ name: 'my_vendors' })
export class MyVendorsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OfferingEntity, (offering) => offering.myVendors, {
    nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'offering_id' })
  offering: OfferingEntity;

  @ManyToOne(() => VisitorEntity, (visitor) => visitor.myVendors, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'visitor_id' })
  visitor: VisitorEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}