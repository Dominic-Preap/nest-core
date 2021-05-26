import { BadRequestException, HttpService } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { OAuth2Client } from 'google-auth-library';
import * as Twitter from 'twitter';

import { SocialConfig } from './social.dto';
import {
  FacebookException,
  FacebookResult,
  LinkedinException,
  LinkedinResult,
  TwitterResult
} from './social.interface';

export class Social {
  private googleClient = new OAuth2Client();
  constructor(private readonly config: SocialConfig, private readonly http: HttpService) {}

  async getTwitterData(accessTokenKey: string, accessTokenSecret: string) {
    const client = new Twitter({
      consumer_key: this.config.TWITTER_CONSUMER_KEY,
      consumer_secret: this.config.TWITTER_CONSUMER_SECRET,
      access_token_key: accessTokenKey,
      access_token_secret: accessTokenSecret
    });

    return new Promise<TwitterResult>((resolve, reject) =>
      client.get('account/verify_credentials', (error, tweet) =>
        error ? reject(error) : resolve(tweet)
      )
    ).catch(e => {
      const [error] = e;
      throw new BadRequestException(error.message);
    });
  }

  async getFacebookData(accessToken) {
    try {
      const url = `https://graph.facebook.com/me?fields=id,email,first_name,last_name&access_token=${accessToken}`;
      const { data } = await this.http.get<FacebookResult>(url).toPromise();
      return data;
    } catch (e) {
      const { response }: AxiosError = e;
      const res = response as AxiosResponse<FacebookException>;
      throw new BadRequestException(res.data.error.message);
    }
  }

  // TODO:
  async getGoogleData(accessToken) {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: accessToken,
        audience: this.config.GOOGLE_CLIENT_ID
      });
      return !ticket ? null : ticket!.getPayload();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getLinkedInData(accessToken) {
    try {
      const url = 'https://api.linkedin.com/v1/people/~?format=json';
      const headers = { Authorization: `Bearer ${accessToken}` };
      const { data } = await this.http.get<LinkedinResult>(url, { headers }).toPromise();
      return data;
    } catch (e) {
      const { response }: AxiosError = e;
      const res = response as AxiosResponse<LinkedinException>;
      throw new BadRequestException(res.data.message);
    }
  }
}
