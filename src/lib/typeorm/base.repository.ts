import stack from 'callsites';
import { readFile } from 'fs';
import { dirname, resolve } from 'path';
import { ObjectLiteral, Repository } from 'typeorm';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);

/**
 * Custom Repository with enhance query raw sql statement
 */
export class BaseRepository<T> extends Repository<T> {
  /**
   * Run SQL with key value pair parameters
   *
   * @param sql sql statement
   * @param params sql parameter in key value pair
   * @see https://github.com/typeorm/typeorm/issues/556#issuecomment-317459125
   */
  async $runSQL<T>(sql: string, params: ObjectLiteral): Promise<T> {
    const [q, p] = this.manager.connection.driver.escapeQueryWithParameters(sql, params, {});
    return this.query(q, p);
  }

  /**
   * Run SQL file with key value pair parameters
   *
   * @param sqlPath sql file path
   * @param params sql parameter in key value pair
   */
  async $runSQLFile<T>(sqlPath: string, params: ObjectLiteral): Promise<T> {
    const sql = await this.$readSQLFile(sqlPath);
    console.log(sql);
    return this.$runSQL(sql, params);
  }

  /**
   * Read SQL file
   */
  private async $readSQLFile(sqlPath: string) {
    // find dirname where this function was called.
    const caller = stack()[0].getFileName() || '';
    const callerDirname = dirname(caller);

    // * ['../'] means we use this function from @lib
    return readFileAsync(resolve(callerDirname, '../', sqlPath), 'utf8');
  }
}
