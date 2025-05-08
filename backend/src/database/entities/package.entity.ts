import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OfferingEntity } from "./offering.entity";
import { PaymentEntity } from './payment.entity';

@Entity({ name: 'package' })
export class PackageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 500 })
    description: string;

    @Column({ 
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0
    })
    pricing: number;

    @Column({ type: 'varchar', array: true, nullable: true})
    features: string[];

    @Column({ type: 'boolean', default: false })
    visible: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(() => OfferingEntity, o => o.packages)
    @JoinColumn({ name: 'offering_id' })
    offering: OfferingEntity;

    @OneToMany(() => PaymentEntity, payment => payment.package)
    payments: PaymentEntity[];
}