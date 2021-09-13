import { Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { i18n } from 'i18next';
import * as FilesystemBackend from 'i18next-fs-backend';
import * as i18nextMiddleware from 'i18next-http-middleware';
import { resolve } from 'path';

import { format } from './i18next.helper';

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const i18next: i18n = require('i18next');
export class I18NextLib {
  private logger: Logger = new Logger('i18NextModule');

  constructor(public readonly httpAdapterHost: HttpAdapterHost) {
    i18next
      .use(FilesystemBackend)
      .use(i18nextMiddleware.LanguageDetector)
      .init({
        ns: ['translation', 'notification'], // ! NOTE: ...
        lng: 'en', // language to use (overrides language detection)
        preload: ['en', 'kh'], // Important on server side to assert translations are loaded before rendering views.
        fallbackLng: 'en', // language to use if translations in user language are not available
        debug: false, // logs info level to console output.
        keySeparator: false, // we do not use keys in form messages.welcome
        returnEmptyString: true, // Not allows empty string cause some error on react component
        saveMissing: true, // calls save missing key function on backend if key not found
        interpolation: {
          escapeValue: false, // react already safes from xss
          format
        },
        detection: {
          order: ['header', 'querystring'], // order and from where user language should be detected
          lookupQuerystring: 'lng', // keys or params to lookup language from
          lookupHeader: 'x-language' // https://github.com/i18next/i18next-express-middleware/issues/179
        },
        backend: {
          // path where resources get loaded from
          loadPath: resolve('.', 'assets', 'locales', '{{lng}}', '{{ns}}.json'),

          // path to post missing resources
          addPath: resolve('.', 'assets', 'locales', '{{lng}}', '{{ns}}.missing.json')
        }
      });

    // middleware for i18next in express.
    // https://github.com/i18next/i18next-express-middleware
    // https://docs.nestjs.com/faq/http-adapter
    httpAdapterHost.httpAdapter.use(i18nextMiddleware.handle(i18next));

    this.logger.log('i18next loaded');
  }
}
