import { EntityRepository, Repository } from 'typeorm';

import { User, UserProfile } from '@entities';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async $findAndCountAll(opt: FindMeOpt) {
    const { name, email, organizationId, positionId, roleId, status } = opt;
    const q = this.createQueryBuilder('u')
      // .innerJoinAndSelect('u.profile', 'p')
      .innerJoinAndMapMany('u.profile', UserProfile, 'p', 'p.userId = u.id')
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

interface FindMeOpt {
  email?: string;
  name?: string;
  organizationId?: number;
  positionId?: number;
  roleId?: number;
  status?: string;
}
