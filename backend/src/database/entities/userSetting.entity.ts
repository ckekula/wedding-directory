import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class UserSettingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ default: false })
  receiveNotifications: boolean;

  @Column({ default: false })
  receiveEmails: boolean;

  @OneToOne(() => UserEntity, (user) => user.settings)
  @JoinColumn({ name: 'userId' })
   user: UserEntity;
}