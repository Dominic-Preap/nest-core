import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'cat_locales' })
export class CatLocale extends Model<CatLocale> {
  @Column({ primaryKey: true })
  catId!: number;

  @Column({ primaryKey: true })
  languageId!: number;

  @Column
  name!: string;
}
