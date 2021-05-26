import { gql, GraphQLClient } from 'graphql-request';

export class GraphQLRequest {
  constructor(private readonly client: GraphQLClient) {}

  /**
   * This is an example API, you should create you own API here
   *
   * @see https://rickandmortyapi.com/graphql
   */
  async getCharacters(opt: GetCharactersOption) {
    const query = gql`
      query ($page: Int) {
        characters(page: $page) {
          info {
            count
            pages
            next
            prev
          }
          results {
            id
            name
            status
            species
            gender
          }
        }
      }
    `;

    return this.client.request<GetCharactersResult, GetCharactersOption>(query, opt);
  }
}

interface GetCharactersOption {
  page: number;
  name?: string;
  gender?: string;
}

interface GetCharactersResult {
  characters: {
    info: {
      count: number;
      pages: number;
      next: number;
      prev: number;
    };
    results: Array<{
      id: string;
      name: string;
      status: string;
      species: string;
      gender: string;
    }>;
  };
}
