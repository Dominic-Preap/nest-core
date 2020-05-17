import { i18n as _i18n } from 'i18next';

export { I18NextModule } from './i18next.module';
export { I18Next } from './i18next.decorator';
export * from './i18next.typing';

export { i18next as i18n } from './i18next'; // use this instead import i18next directly, cause es6 export are not working

export type i18next = _i18n;
