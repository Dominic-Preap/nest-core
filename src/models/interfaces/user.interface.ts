export interface ValueOptions {
  encryptedKey: string;
  // -----------------
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  nickName: string;
  createdBy: string;
  updatedBy: string;
}

export interface FindOneOptions {
  encryptedKey: string;
  // -----------------
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  nickName?: string;
  positionIds?: number[];
  roleId?: number;
  gender?: string;
  status?: string;
}

export interface FindAndCountAllOptions extends FindOneOptions {
  // -----------
  order: string;
  limit: number;
  offset: number;
}
