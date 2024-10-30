import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ReviewEntity } from './review.entity';

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

  @OneToMany(() => ReviewEntity, r => r.visitor)
  reviews: ReviewEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
