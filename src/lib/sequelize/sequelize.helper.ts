import stack from 'callsites';
import { readFile } from 'fs';
import { dirname, resolve } from 'path';
import { QueryTypes, Sequelize, Transaction } from 'sequelize';
import * as format from 'string-template';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);

export interface RunQueryOption {
  replacements?: { [key: string]: any };
  substitution?: { [key: string]: any };
  transaction?: Transaction | any;
  plain?: boolean; // Return SELECT as a single row
  logging?: () => void;
}

/**
 * Read sql file.
 */
export async function ReadSQLFile(sqlPath: string) {
  // find dirname where this function was called.
  const caller = stack()[0].getFileName() || '';
  const callerDirname = dirname(caller);

  // * ['../'] means we use this function from @common
  return readFileAsync(resolve(callerDirname, '../', sqlPath), 'utf8');
  // return readFileAsync(resolve(callerDirname, sqlPath), 'utf8');
}

/**
 * Execute an SQL query with the database.
 */
export async function RunQuery<T>(
  db: Sequelize,
  query: string,
  options: RunQueryOption
): Promise<T> {
  const { substitution, ...queryOptions } = options;
  const sql = format(query, substitution);
  return db.query(sql, { type: QueryTypes.SELECT, ...queryOptions }) as any;
}

/**
 * Read an SQL File and execute with the database.
 */
export async function RunSQLQuery<T = any>(
  db: Sequelize,
  sqlPath: string,
  options: RunQueryOption
) {
  const query = await ReadSQLFile(sqlPath);
  return RunQuery<T>(db, query, options);
}
