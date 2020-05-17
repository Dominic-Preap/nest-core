import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { User } from './user.entity';

@Entity('_UserProfiles')
export class UserProfile {
  @PrimaryColumn()
  userId!: number;

  @Column()
  nickName!: string;

  // prettier-ignore
  @OneToOne(type => User, u => u.profile)
  @JoinColumn()
  user?: User;
}
