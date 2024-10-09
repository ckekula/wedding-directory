import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'visitor' })
export class VisitorEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar'})
  password: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  visitor_fname?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  visitor_lname?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  partner_fname?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  partner_lname?: string;

  @Column({ type: 'date', nullable: true })
  engaged_date?: Date;

  @Column({ type: 'date', nullable: true })
  wed_date?: Date;

  @Column({ type: 'varchar', length: 30, nullable: true })
  wed_venue?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  profile_pic_url?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
