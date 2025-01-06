import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { VisitorEntity } from './visitor.entity';

@Entity({ name: 'guestlist' })
export class GuestListEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar' })
  number: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  contact?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 15 })
  status: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => VisitorEntity, (v) => v.guestlist)
  @JoinColumn({ name: 'visitor_id' })
  visitor: VisitorEntity;
}
