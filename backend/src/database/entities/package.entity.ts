import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { VendorEntity } from './vendor.entity';

@Entity({ name: 'package' })
export class PackageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 100 })
    category: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    bus_phone: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    bus_email: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    about: string;

    @Column({ type: 'varchar', length: 100, nullable: true  })
    banner: string;

    @Column('text', { array: true, nullable: true })
    media: string[];

    @Column({ type: 'varchar', length: 100, nullable: true })
    experience: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    start_price: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    website : string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    instagram: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    facebook: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    x: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    tiktok: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(() => VendorEntity, v => v.package)
    @JoinColumn({ name: 'vendor_id' })
    vendor: VendorEntity;
}