import { Column, Model, Table } from 'sequelize-typescript';

import { RunQueryOption, RunSQLQuery } from '@lib/sequelize/sequelize.helper';

import * as I from './interfaces/user.interface';

class UserBaseModel extends Model<UserBaseModel> {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ allowNull: true })
  auth0Id!: string;

  @Column({ allowNull: false })
  firstName!: string;

  @Column({ allowNull: false })
  lastName!: string;

  @Column({ allowNull: false })
  nickName!: string;

  @Column({ allowNull: true })
  phone!: string;

  @Column({ allowNull: true })
  email!: string;

  @Column({ allowNull: false, defaultValue: 0 })
  createdBy!: number;

  @Column({ allowNull: false, defaultValue: 0 })
  updatedBy!: number;
}

@Table({ tableName: 'Users', timestamps: true })
export class UserModel extends UserBaseModel {
  static async $findAndCountAll(opts: I.FindAndCountAllOpt) {
    const { substitution: sb, replacements } = this.$filter(opts);
    const filterLimit = filterBy.limit(opts.limit);
    const filterOffset = filterBy.offset(opts.offset);
    const order = `u.id DESC`;

    const options: RunQueryOption = {
      replacements,
      substitution: { ...sb, order, filterLimit, filterOffset }
    };

    const sql = '../queries/user/find-all.sql';
    const sqlCount = '../queries/user/count.sql';
    const [data, { total }] = await Promise.all([
      RunSQLQuery(this.sequelize!, sql, options),
      RunSQLQuery(this.sequelize!, sqlCount, { ...options, plain: true })
    ]);
    return { data, total };
  }

  static async $findOne(opts: I.FindOneOpt) {
    const { substitution, replacements } = this.$filter(opts);
    const options: RunQueryOption = { replacements, substitution, plain: true };
    const sql = '../queries/user/find-one.sql';
    return RunSQLQuery(this.sequelize!, sql, options);
  }

  static $filter(opts: I.FindOneOpt) {
    const substitution: Record<string, any> = {
      filterByEqualEmail: filterBy.equalEmail(opts.email),
      filterByEqualPhone: filterBy.equalPhone(opts.phone),
      filterByLikeFirstName: filterBy.likeFirstName(opts.firstName),
      filterByLikeLastName: filterBy.likeLastName(opts.lastName),
      filterByLikeNickName: filterBy.likeNickName(opts.nickName)
    };
    const replacements: Record<string, any> = {
      ...opts,
      firstName: `%${opts.firstName}%`,
      lastName: `%${opts.lastName}%`,
      nickName: `%${opts.nickName}%`
    };
    return { replacements, substitution };
  }
}

// prettier-ignore
const filterBy = {
  equalEmail    : (x?: string) => (x ? 'AND u.email = :email' : ''),
  equalPhone    : (x?: string) => (x ? 'AND u.phone = :phone' : ''),
  likeFirstName : (x?: string) => (x ? 'AND u.firstName LIKE :firstName' : ''),
  likeLastName  : (x?: string) => (x ? 'AND u.lastName  LIKE :lastName' : ''),
  likeNickName  : (x?: string) => (x ? 'AND u.nickName  LIKE :nickName' : ''),
  limit         : (x: number)  => (x ? 'LIMIT :limit' : ''),
  offset        : (x: number)  => (x ? 'OFFSET :offset' : '')
};
