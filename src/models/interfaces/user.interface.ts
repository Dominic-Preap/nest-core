export interface FindOneOpt {
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

export interface FindAndCountAllOpt extends FindOneOpt {
  order?: string;
  limit: number;
  offset: number;
}
