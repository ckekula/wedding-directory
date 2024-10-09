import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'visitor' })
export class VisitorEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar'})
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

  @Column({ type: 'varchar', nullable: true })
  phone?: string;

  @Column({ type: 'varchar', nullable: true })
  city?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
