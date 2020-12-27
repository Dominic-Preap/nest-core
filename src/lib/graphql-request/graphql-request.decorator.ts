import { Inject } from '@nestjs/common';

import { GRAPHQL_REQUEST_TOKEN } from './graphql-request.constant';

export const InjectGraphQLRequest = () => Inject(GRAPHQL_REQUEST_TOKEN);
