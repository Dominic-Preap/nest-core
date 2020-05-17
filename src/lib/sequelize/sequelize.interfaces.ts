import { Transaction } from 'sequelize';

export interface RunQueryOption {
  replacements?: { [key: string]: any };
  substitution?: { [key: string]: any };
  transaction?: Transaction | any;
  plain?: boolean; // Return SELECT as a single row
  logging?: () => void;
}
// ---------------------------------------------------
export interface LocaleProp {
  name: string;
  description?: string;
}

export interface Locale {
  [key: string]: LocaleProp;
}
// ---------------------------------------------------
export interface QueryOption {
  transaction?: Transaction | any;
}
