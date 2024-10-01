import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PortfolioEntity } from './portfolio.entity'

@Entity({ name: 'vendor' })
export class VendorEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true  })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 20 })
  fname: string;

  @Column({ type: 'varchar', length: 20 })
  lname: string;

  @Column({ type: 'varchar', length: 50 })
  busname: string;

  @Column({ type: 'varchar', length: 12 })
  phone: string;

  @Column({ type: 'varchar', length: 20 })
  category: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp',  nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' , nullable: false })
  updatedAt: Date;

  @OneToOne(() => PortfolioEntity)
  @JoinColumn({ name: 'portfolio_id' })
  portfolio: PortfolioEntity;
}
