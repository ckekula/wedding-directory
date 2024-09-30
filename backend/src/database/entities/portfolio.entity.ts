import { Entity, Column, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { VendorEntity } from './vendor.entity';

@Entity({ name: 'portfolio' })
export class PortfolioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    bus_phone: string;

    @Column({ type: 'varchar', length: 100 })
    bus_email: string;

    @Column({ type: 'varchar', length: 100 })
    about: string;

    @Column({ type: 'varchar', length: 100 })
    pfp: string;

    @Column({ type: 'varchar', length: 100 })
    address: string;

    @Column({ type: 'varchar', length: 100 })
    city: string;

    @Column({ type: 'varchar', length: 100 })
    latitude: string;

    @Column({ type: 'varchar', length: 100 })
    longitude: string;

    @Column({ type: 'varchar', length: 100 })
    experience: string;

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

    @OneToOne(() => VendorEntity, v => v.portfolio)
    vendor: VendorEntity;
}