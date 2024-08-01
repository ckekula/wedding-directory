import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserSettingEntity } from './userSetting.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  displayName?: string;

  @OneToOne(() => UserSettingEntity)
  @JoinColumn()
  settings?: UserSettingEntity;
}
