import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserSettingModel } from 'src/graphql/models/userSetting.model';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  displayName?: string;

  @OneToOne(() => UserSettingModel)
  @JoinColumn()
  settings?: UserSettingModel;
}
