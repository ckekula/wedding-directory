import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OfferingEntity } from "./offering.entity";

@Entity({ name: 'package' })
export class PackageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 500 })
    description: string;

    @Column({ type: 'integer' })
    pricing: number;

    @Column({ type: 'varchar', array: true, nullable: true})
    features: string[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(() => OfferingEntity, o => o.package)
    @JoinColumn({ name: 'offering_id' })
    offering: OfferingEntity;
}