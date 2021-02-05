import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { UserEntity } from './user.entity';

@Entity('UserProfiles')
export class UserProfileEntity {
  @PrimaryColumn()
  userId!: number;

  @Column()
  nickName!: string;

  @OneToOne(() => UserEntity, u => u.profile)
  @JoinColumn()
  user?: UserEntity;
}
