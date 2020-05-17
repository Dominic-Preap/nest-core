import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'cats' })
export class Cat extends Model<Cat> {
  @Column({ autoIncrement: true, primaryKey: true }) id!: number;

  @Column name!: string;

  @Column age!: number;

  @Column breed!: string;
}
