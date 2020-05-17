import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';

type Status = 'active' | 'inactive';

class BaseLanguageModel extends Model<Language> {
  @Column({ autoIncrement: true, primaryKey: true })
  id!: number;

  @Column({ allowNull: false })
  name!: string;

  @Column({ allowNull: false })
  code!: string;

  @Column({ allowNull: false, type: DataType.ENUM('active', 'inactive'), defaultValue: 'active' })
  status!: Status;

  @CreatedAt
  @Column({ field: 'created_date' })
  createdDate!: Date;

  @UpdatedAt
  @Column({ field: 'updated_date' })
  updatedDate!: Date;
}

@Table({ tableName: 'languages' })
export class Language extends BaseLanguageModel {
  /**
   * Find available languages
   */
  static $getActive(languageId?: number): Promise<Language[]> {
    const filterByLanguageId = !languageId ? null : { id: languageId };
    return this.findAll({
      raw: true,
      where: {
        ...filterByLanguageId,
        status: 'active'
      }
    });
  }
}
