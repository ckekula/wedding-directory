import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PackageEntity } from './package.entity';

@Entity({ name: 'vendor' })
export class VendorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 20 })
  fname: string;

  @Column({ type: 'varchar', length: 20 })
  lname: string;

  @Column({ type: 'varchar', length: 500 })
  location: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 50 })
  busname: string;

  @Column({ type: 'varchar', length: 12 })
  phone: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  profile_pic_url: string;


  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: false })

  updatedAt: Date;

  @OneToMany(() => PackageEntity, (p) => p.vendor, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  package: PackageEntity[];
}
