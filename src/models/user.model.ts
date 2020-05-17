import { fn } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

import { RunQueryOption, RunSQLQuery } from '@lib/sequelize';

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
export class User extends UserBaseModel {
  static async $create(values: I.ValueOptions) {
    const encryptFields = {
      ...encrypt('email', values.email, values.encryptedKey),
      ...encrypt('phone', values.phone, values.encryptedKey),
      ...encrypt('firstName', values.firstName, values.encryptedKey),
      ...encrypt('lastName', values.lastName, values.encryptedKey),
      ...encrypt('nickName', values.nickName, values.encryptedKey)
    };

    return this.create({ ...values, ...encryptFields, status: 'active' });
  }

  static async $update(values: I.ValueOptions, where: any) {
    const encryptFields = {
      ...encrypt('email', values.email, values.encryptedKey),
      ...encrypt('phone', values.phone, values.encryptedKey),
      ...encrypt('firstName', values.firstName, values.encryptedKey),
      ...encrypt('lastName', values.lastName, values.encryptedKey),
      ...encrypt('nickName', values.nickName, values.encryptedKey)
    };

    return this.update({ ...values, ...encryptFields }, { where });
  }

  static async $findAndCountAll(opts: I.FindAndCountAllOptions) {
    const substitution = {
      filterByEqualEmail: filterByEqualEmail(opts.email),
      filterByEqualPhone: filterByEqualPhone(opts.phone),
      filterByLikeFirstName: filterByLikeFirstName(opts.firstName),
      filterByLikeLastName: filterByLikeLastName(opts.lastName),
      filterByLikeNickName: filterByLikeNickName(opts.nickName),
      filterByRoleId: filterByRoleId(opts.roleId),
      filterByPositions: filterByPositions(opts.positionIds || []),
      filterByGender: filterByGender(opts.gender),
      filterByStatus: filterByStatus(opts.status),
      filterLimit: filterLimit(opts.limit),
      filterOffset: filterOffset(opts.offset),
      order: `u.id DESC`
    };
    const replacements = {
      ...opts,
      firstName: `%${opts.firstName}%`,
      lastName: `%${opts.lastName}%`,
      nickName: `%${opts.nickName}%`
    };
    const options: RunQueryOption = { replacements, substitution };

    const sql = '../queries/user/find-all.sql';
    const sqlCount = '../queries/user/count.sql';

    const [data, { total }] = await Promise.all([
      RunSQLQuery<any>(this.sequelize!, sql, options),
      RunSQLQuery<any>(this.sequelize!, sqlCount, { ...options, plain: true })
    ]);
    data.forEach(u => (u.name = formatName('any', u)));
    return { data, total };
  }

  static async $findOne(opts: I.FindOneOptions) {
    const substitution = {
      filterByEqualEmail: filterByEqualEmail(opts.email),
      filterByEqualPhone: filterByEqualPhone(opts.phone),
      filterByLikeFirstName: filterByLikeFirstName(opts.firstName),
      filterByLikeLastName: filterByLikeLastName(opts.lastName),
      filterByLikeNickName: filterByLikeNickName(opts.nickName),
      filterByRoleId: filterByRoleId(opts.roleId),
      filterByPositions: filterByPositions(opts.positionIds || []),
      filterByGender: filterByGender(opts.gender),
      filterByStatus: filterByStatus(opts.status)
    };
    const replacements = {
      ...opts,
      firstName: `%${opts.firstName}%`,
      lastName: `%${opts.lastName}%`,
      nickName: `%${opts.nickName}%`
    };

    const options: RunQueryOption = { replacements, substitution };
    const sql = '../queries/user/find-one.sql';

    const user = await RunSQLQuery<any>(this.sequelize!, sql, options);
    user.name = formatName('any', user);
    return user;
  }
}

// Encrypt Helper
const encrypt = (key: string, value: any, encryptedKey: string) =>
  value ? { key: fn('AES_ENCRYPT', value, encryptedKey) } : {};

// Do not use this
const filterByCastLike = (field: string) => `AND CAST(AES_DECRYPT(${field}, :encryptedKey) AS char) LIKE :${field}`;
const filterByCastEqual = (field: string) => `AND CAST(AES_DECRYPT(${field}, :encryptedKey) AS char) = :${field}`;

// Use this instead
const filterByEqualEmail    = (value?: string) => (value ? filterByCastEqual('u.email') : ''); // prettier-ignore
const filterByEqualPhone    = (value?: string) => (value ? filterByCastEqual('u.phone') : ''); // prettier-ignore
const filterByLikeFirstName = (value?: string) => (value ? filterByCastLike('u.firstName') : ''); // prettier-ignore
const filterByLikeLastName  = (value?: string) => (value ? filterByCastLike('u.lastName') : ''); // prettier-ignore
const filterByLikeNickName  = (value?: string) => (value ? filterByCastLike('u.nickName') : ''); // prettier-ignore

const filterByRoleId        = (id?: number)     => (id ? 'AND ur.id = :roleId' : ''); // prettier-ignore
const filterByPositions     = (ids: number[])  => (!ids.length ? 'AND p.id IN (:positionIds)' : ''); // prettier-ignore
const filterByGender        = (gender?: string) => (gender ? 'AND u.gender = :gender' : ''); // prettier-ignore
const filterByStatus        = (status?: string) => (status ? 'AND u.status = :status' : ''); // prettier-ignore

const filterLimit           = (limit: number)  => (limit ? 'LIMIT :limit' : ''); // prettier-ignore
const filterOffset          = (offset: number) => (offset ? 'OFFSET :offset' : ''); // prettier-ignore

const formatName = (format: string, user: any) => {
  const { firstName = '', lastName = '', nickName = '' } = user as {
    firstName: string;
    lastName: string;
    nickName: string;
  };

  switch (format) {
    case 'first_name_and_last_name':
      return `${firstName} ${lastName}`;

    case 'last_name_and_first_name':
      return `${lastName} ${firstName}`;

    case 'last_initial_and_first_name':
      return `${lastName.substring(0, 1)} ${firstName}`;

    case 'last_initial_and_last_name':
      return `${lastName.substring(0, 1)} ${lastName}`;

    case 'last_initial_and_nickname':
      return `${lastName.substring(0, 1)} ${nickName}`;

    case 'nickname_and_first_name':
      return `${nickName} ${firstName}`;

    case 'nickname_and_last_name':
      return `${nickName} ${lastName}`;

    case 'last_name_only':
      return lastName;

    default:
      return `${firstName} ${lastName}`;
  }
};
