import { IsNotEmpty, IsString } from 'class-validator';

export class GraphQLRequestConfig {
  @IsNotEmpty()
  @IsString()
  GRAPHQL_REQUEST_ENDPOINT!: string;

  @IsNotEmpty()
  @IsString()
  GRAPHQL_REQUEST_AUTHENTICATION!: string;
}
