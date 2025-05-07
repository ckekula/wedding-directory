import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { VisitorEntity } from './visitor.entity';
import { VendorEntity } from './vendor.entity';
import { PackageEntity } from './package.entity';

@Entity()
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => VisitorEntity, visitor => visitor.payments)
  visitor: VisitorEntity;

  @ManyToOne(() => VendorEntity, vendor => vendor.payments)
  vendor: VendorEntity;

  @ManyToOne(() => PackageEntity, pkg => pkg.payments)
  package: PackageEntity;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  stripeSessionId: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  })
  status: 'pending' | 'completed' | 'failed';

  @CreateDateColumn()
  createdAt: Date;
}