import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { VendorEntity } from './vendor.entity';
import { ReviewEntity } from './review.entity';

@Entity({ name: 'offering' })
export class OfferingEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 20 })
    category: string;

    @Column({ type: 'boolean', default: 'false' })
    visible: boolean;

    @Column({ type: 'varchar', length: 10, nullable: true })
    bus_phone: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    bus_email: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    description: string;

    @Column({ type: 'varchar', length: 300, nullable: true  })
    banner: string;

    @Column('text', { array: true, nullable: true })
    video_showcase: string[];

    @Column('text', { array: true, nullable: true })
    photo_showcase: string[];

    @Column({ type: 'varchar', length: 100, nullable: true })
    pricing: string;

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

    @ManyToOne(() => VendorEntity, v => v.offering)
    @JoinColumn({ name: 'vendor_id' })
    vendor: VendorEntity;

    @OneToMany(() => ReviewEntity, r => r.offering)
    @JoinColumn({ name: 'Review_id' })
    review: ReviewEntity[];
    
}