import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserProfile } from './user-profile.entity';

@Entity('_Users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  status!: string;

  @Column()
  organizationId!: number;

  // prettier-ignore
  @OneToOne(type => UserProfile, p => p.user)
  @JoinColumn({ name: 'id' })
  profile!: UserProfile;
}
