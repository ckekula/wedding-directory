import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { LocationEntity } from './location.entity';

@Entity({ name: 'vendor' })
export class VendorEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @Column({ type: 'varchar', length: 20 })
  fname: string;

  @Column({ type: 'varchar', length: 20 })
  lname: string;

  @Column({ type: 'varchar', length: 50 })
  busname: string;

  @Column({ type: 'bigint' })
  phone: number;

  @Column({ type: 'varchar', length: 20 })
  category: string;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: false })
  updatedAt: Date;

  @OneToOne(() => LocationEntity)
  @JoinColumn({ name: 'id' })
  location: LocationEntity;
}
