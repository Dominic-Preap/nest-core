// eslint-disable-next-line import/default
import stack from 'callsites';
import { readFile } from 'fs';
import { forEach } from 'lodash';
import { dirname, resolve } from 'path';
import { QueryTypes, Sequelize } from 'sequelize';
import { ModelCtor } from 'sequelize-typescript';
import * as format from 'string-template';
import { promisify } from 'util';

import { Language } from '@models';

import * as I from './sequelize.interfaces';

const readFileAsync = promisify(readFile);

/*
|--------------------------------------------------------------------------
| Helper for read and execute raw and complex queries within the SQL
|--------------------------------------------------------------------------
*/

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
export async function RunQuery<T>(db: Sequelize, query: string, options: I.RunQueryOption): Promise<T> {
  const { logging, replacements, plain, substitution, transaction } = options;
  return db.query(format(query, substitution), {
    type: QueryTypes.SELECT,
    logging,
    plain,
    replacements,
    transaction
  }) as any;
}

/**
 * Read an SQL File and execute with the database.
 */
export async function RunSQLQuery<T>(db: Sequelize, sqlPath: string, options: I.RunQueryOption) {
  const query = await ReadSQLFile(sqlPath);
  return RunQuery<T>(db, query, options);
}

/**
 * Read an SQL File and execute with the database.
 * ! Use this in case you want transform into nested object
 *  @example
 * turn object
 * {
 *   id: 1,
 *   name: 'John',
 *   'profile.name': 'John',
 *   'profile.lastName': 'Doe'
 * }
 *
 * into nested object
 * {
 *   id: 1,
 *   name: 'John',
 *   profile: {
 *     firstName: 'John',
 *     lastName: 'Doe'
 *   }
 * };
 *
 */
// export async function RunSQLQuery<T>(db: Sequelize, sqlPath: string, options: I.RunQueryOption) {
//   import { object } from 'dot-object';
//   const query = await ReadSQLFile(sqlPath);
//   const result = await RunQuery<any | any[]>(db, query, options);
//   return (Array.isArray(result) ? result.map(x => object(x)) : (object(result) as unknown)) as T;
// }

/*
|--------------------------------------------------------------------------
| Helper for Insert and Update Tables related of Locale
|--------------------------------------------------------------------------
*/

/**
 *  Return array of languages. Used when CREATE locale table
 *
 * @param {Locale} locales DTO object from req.body
 * @param {T} main main column from target locale table ex: { productId: 1 }
 * @param {*} languages active language from table Languages
 */
export const ToArrayCreateLang = async <T>(locales: I.Locale, main: T, languages?: Language[]) => {
  /**
   *  EXAMPLE:
   * ===============================
   * const locales = {
   *     en: { name: 'name in English', description: 'desc in English' },
   *     kh: { name: 'name in Khmer', description: 'desc in Khmer' }
   * };
   * const result = await toArrayLang(locales, { productId: 1 });
   * [
   *   {
   *     productId: 1,
   *     languageId: 1,
   *     name: 'name in English',
   *     description: 'desc in English'
   *   },
   *   {
   *     productId: 1,
   *     languageId: 2,
   *     name: 'name in Khmer',
   *     description: 'desc in Khmer'
   *   }
   * ];
   */

  languages = languages || (await Language.$getActive()); // Get active languages from db
  const result: ({ languageId: number } & I.LocaleProp & T)[] = [];
  forEach(locales, (prop, key) => {
    const { id: languageId = 0 } = languages!.find(x => x.code === key) || {}; // check if code exist in db
    if (languageId) result.push({ ...main, ...prop, languageId }); // if exist, insert into array for new record
  });

  return result; // return result to get ready for BulkCreate
};

/**
 * Return array of languages Promise. Used when UPDATE locale table
 *
 */
export const ToArrayUpdateLang = async (
  locales: I.Locale,
  main: object,
  tableLocale: ModelCtor,
  queryOptions: I.QueryOption = {},
  languages?: Language[]
) => {
  /**
   * EXAMPLE:
   * ===============================
   * const locales = {
   *     en: { name: 'name in English', description: 'desc in English' },
   *     kh: { name: 'name in Khmer', description: 'desc in Khmer' }
   * };
   * const result = await toArrayLang(locales, { productId: 1 }, ProductLocale);
   */

  languages = languages || (await Language.$getActive()); // Get active languages from db
  const promises: Promise<boolean>[] = [];
  forEach(locales, (value, key) => {
    const { id: languageId = 0 } = languages!.find(x => x.code === key) || {}; // check if code exist in db
    if (languageId) promises.push(tableLocale.upsert({ ...main, ...value, languageId }, queryOptions) as any); // if exist, upsert into array of promise
  });
  return promises;
};
