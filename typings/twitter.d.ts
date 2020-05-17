// https://github.com/Microsoft/TypeScript/issues/6656#issuecomment-175780097

declare module 'twitter' {
  import { EventEmitter } from 'events';
  interface TwitterOption {
    consumer_key: string;
    consumer_secret: string;
    /**
     *For User based authentication:
     */
    access_token_key?: string;
    access_token_secret?: string;
    /**
     * For Application Only based authentication:
     */
    bearer_token?: string;
  }
  class Twitter {
    constructor(opt: TwitterOption);

    get<T>(url: string, callback: (error: any, tweet: any, response: T) => void): void;

    post<T>(url: string, body: any): Promise<T>;
    post<T>(url: string, body: any, callback: (error: any, tweet: any, response: T) => void): void;

    stream(url: string, option: any, callback: (stream: EventEmitter) => void): void;
  }

  namespace Twitter {}

  export = Twitter;
}
