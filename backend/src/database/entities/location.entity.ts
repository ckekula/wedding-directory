import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { VendorEntity } from './vendor.entity';

@Entity({ name: 'location' })
export class LocationEntity {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  address: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @OneToOne(() => VendorEntity, vendor => vendor.location)
  @JoinColumn({ name: 'id' })
  vendor: VendorEntity;
}
