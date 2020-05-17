export interface FindOneOpt {
  status?: string;
  email?: string;
  logo?: string;
  indexName?: string;
}

export interface FindAllOpt extends FindOneOpt {
  limit?: number;
}
