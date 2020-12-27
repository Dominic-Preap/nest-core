import { GraphQLClient } from 'graphql-request';

import { ConfigService } from '../config';
import { GraphQLRequest } from './graphql-request';
import { GRAPHQL_REQUEST_TOKEN } from './graphql-request.constant';
import { GraphQLRequestConfig } from './graphql-request.dto';

export const GraphQLRequestProvider = {
  inject: [ConfigService],
  provide: GRAPHQL_REQUEST_TOKEN,
  useFactory: (configService: ConfigService) => {
    const config = configService.validate('GraphQLRequestModule', GraphQLRequestConfig);
    const client = new GraphQLClient(config.GRAPHQL_REQUEST_ENDPOINT, {
      headers: { authorization: config.GRAPHQL_REQUEST_AUTHENTICATION }
    });
    return new GraphQLRequest(client);
  }
};
