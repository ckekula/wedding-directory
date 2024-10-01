import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { VendorEntity } from './vendor.entity';

@Entity({ name: 'package' })
export class PackageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    category: string;

    @Column({ type: 'varchar', length: 100 })
    bus_phone: string;

    @Column({ type: 'varchar', length: 100 })
    bus_email: string;

    @Column({ type: 'varchar', length: 100 })
    about: string;

    @Column({ type: 'varchar', length: 100 })
    pfp: string;

    @Column('text', { array: true, nullable: true })
    media: string[];

    @Column({ type: 'varchar', length: 100 })
    experience: string;

    @Column({ type: 'varchar', length: 100 })
    start_price: string;

    @Column({ type: 'varchar', length: 100 })
    website : string;

    @Column({ type: 'varchar', length: 100 })
    instagram: string;

    @Column({ type: 'varchar', length: 100 })
    facebook: string;

    @Column({ type: 'varchar', length: 100 })
    x: string;

    @Column({ type: 'varchar', length: 100 })
    tiktok: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp',  nullable: false })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' , nullable: false })
    updatedAt: Date;

    @ManyToOne(() => VendorEntity, v => v.package)
    @JoinColumn({ name: 'vendor_id' })  // Add this to make the relation explicit
    vendor: VendorEntity;
}