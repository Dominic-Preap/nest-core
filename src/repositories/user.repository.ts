import { EntityRepository } from 'typeorm';

import { UserEntity, UserProfileEntity } from '@entities';
import { BaseRepository } from '@lib/typeorm/base.repository';

import * as I from './interfaces/user.interface';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  async $findAndCountAll(opt: I.FindMeOpt) {
    const { name, email, organizationId, positionId, roleId, status } = opt;
    const q = this.createQueryBuilder('u')
      // .innerJoinAndSelect('u.profile', 'p')
      .innerJoinAndMapMany('u.profile', UserProfileEntity, 'p', 'p.userId = u.id')
      .addSelect('u.id', 'id')
      .addSelect('email')
      .addSelect('p.nickName', 'nickName')
      .addSelect('p.firstName', 'firstName')
      .addSelect('p.lastName', 'lastName')
      .addSelect(`CONCAT(p.firstName,' ', p.lastName)`, 'fullName')
      .addSelect('status')
      .addSelect('positionId')
      .addSelect('organizationId')
      .addSelect('roleId')
      .where('u.id IS NOT NULL');

    if (email)            q.andWhere('u.email           = :email', { email }); // prettier-ignore
    if (name)             q.andWhere('p.nickName        LIKE :name', { name: `%${name}%` }); // prettier-ignore
    if (organizationId)   q.andWhere('u.organizationId  = :organizationId', { organizationId }); // prettier-ignore
    if (positionId)       q.andWhere('u.positionId      = :positionId', { positionId }); // prettier-ignore
    if (roleId)           q.andWhere('u.roleId          = :roleId', { roleId }); // prettier-ignore
    if (status)           q.andWhere('u.status          = :status', { status }); // prettier-ignore

    const [data, total] = await Promise.all([q.getMany(), q.getCount()]);
    return { data, total };
  }
}
