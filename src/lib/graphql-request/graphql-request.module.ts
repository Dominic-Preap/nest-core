import { Global, Module } from '@nestjs/common';

import { GraphQLRequestProvider } from './graphql-request.provider';

@Global()
@Module({
  providers: [GraphQLRequestProvider],
  exports: [GraphQLRequestProvider]
})
export class GraphQLRequestModule {}
