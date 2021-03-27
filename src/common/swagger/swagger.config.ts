import {
  CaseInsensitiveFilterPlugin,
  CustomLayoutPlugin,
  operationsSorter
} from './swagger.plugin';

// For more info about config:
// https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md
export const swaggerOptions = {
  defaultModelExpandDepth: 3,
  defaultModelsExpandDepth: -1,
  docExpansion: 'none',
  filter: true,
  layout: 'CustomLayout',
  operationsSorter,
  plugins: [CaseInsensitiveFilterPlugin, CustomLayoutPlugin]
};
