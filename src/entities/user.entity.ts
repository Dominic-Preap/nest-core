import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserProfileEntity } from './user-profile.entity';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  status!: string;

  @Column()
  organizationId!: number;

  @OneToOne(() => UserProfileEntity, p => p.user)
  @JoinColumn({ name: 'id' })
  profile!: UserProfileEntity;
}
