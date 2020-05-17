import { tuple } from './base';

export const RoleEnum = tuple('admin', 'supervisor', 'qa');
export type RoleType = typeof RoleEnum[number]; // union type
