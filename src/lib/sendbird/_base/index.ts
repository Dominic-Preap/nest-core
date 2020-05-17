export interface BaseLimitTokenOption {
  /**
   * Specifies a token that indicates the starting index of a chunk of results to retrieve. If not specified, the index is set as 0.
   */
  token?: string;

  /**
   * 	Specifies the number of results to return per page. Acceptable values are 1 to 100, inclusive. (Default: 10)
   *
   * @default 10
   */
  limit?: number;
}

export interface BaseNextOption {
  /**
   * The value for the `token` parameter to retrieve the next page in the result set.
   */
  next: string;
}

export interface Metadata {
  [key: string]: any;
}

export interface Metacounter {
  [key: string]: number;
}

export type Language =
  | 'af'
  | 'sq'
  | 'am'
  | 'ar'
  | 'hy'
  | 'az'
  | 'eu'
  | 'be'
  | 'bn'
  | 'bs'
  | 'bg'
  | 'ca'
  | 'ceb'
  | 'zh-CN'
  | 'zh '
  | 'zh-TW '
  | 'co'
  | 'hr'
  | 'cs'
  | 'da'
  | 'nl'
  | 'en'
  | 'eo'
  | 'et'
  | 'fi'
  | 'fr'
  | 'fy'
  | 'gl'
  | 'ka'
  | 'de'
  | 'el'
  | 'gu'
  | 'ht'
  | 'ha'
  | 'haw'
  | 'he '
  | 'iw'
  | 'hi'
  | 'hmn'
  | 'hu'
  | 'is'
  | 'ig'
  | 'id'
  | 'ga'
  | 'it'
  | 'ja'
  | 'jv'
  | 'kn'
  | 'kk'
  | 'km'
  | 'ko'
  | 'ku'
  | 'ky'
  | 'lo'
  | 'la'
  | 'lv'
  | 'lt'
  | 'lb'
  | 'mk'
  | 'mg'
  | 'ms'
  | 'ml'
  | 'mt'
  | 'mi'
  | 'mr'
  | 'mn'
  | 'my'
  | 'ne'
  | 'no'
  | 'ny'
  | 'ps'
  | 'fa'
  | 'pl'
  | 'pt'
  | 'pa'
  | 'ro'
  | 'ru'
  | 'sm'
  | 'gd'
  | 'sr'
  | 'st'
  | 'sn'
  | 'sd'
  | 'si'
  | 'sk'
  | 'sl'
  | 'so'
  | 'es'
  | 'su'
  | 'sw'
  | 'sv'
  | 'tl'
  | 'tg'
  | 'ta'
  | 'te'
  | 'th'
  | 'tr'
  | 'uk'
  | 'ur'
  | 'uz'
  | 'vi'
  | 'cy'
  | 'xh'
  | 'yi'
  | 'yo'
  | 'zu';
