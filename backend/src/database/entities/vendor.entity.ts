import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { OfferingEntity } from './offering.entity';
import { PaymentEntity } from './payment.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'vendor' })
export class VendorEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
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

  @Column({ type: 'varchar', length: 100, nullable: true })
  about: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: false })
  updatedAt: Date;

  @OneToMany(() => OfferingEntity, (o) => o.vendor, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  offering: OfferingEntity[];

  @OneToMany(() => PaymentEntity, payment => payment.vendor)
  payments: PaymentEntity[];
}
