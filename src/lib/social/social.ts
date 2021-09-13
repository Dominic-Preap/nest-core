import { HttpService } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { OAuth2Client } from 'google-auth-library';
import { lastValueFrom } from 'rxjs';
import TwitterApi from 'twitter-api-v2';

import { SocialConfig } from './social.dto';
import {
  FacebookException,
  FacebookResult,
  LinkedinException,
  LinkedinResult
} from './social.interface';

export class Social {
  private googleClient = new OAuth2Client();
  constructor(private readonly config: SocialConfig, private readonly http: HttpService) {}

  async getTwitterData(accessToken: string, accessSecret: string) {
    const client = new TwitterApi({
      appKey: this.config.TWITTER_CONSUMER_KEY,
      appSecret: this.config.TWITTER_CONSUMER_SECRET,
      accessToken,
      accessSecret
    });

    try {
      return client.v1.verifyCredentials();
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }

  async getFacebookData(accessToken) {
    try {
      const url = `https://graph.facebook.com/me?fields=id,email,first_name,last_name&access_token=${accessToken}`;
      const { data } = await lastValueFrom(this.http.get<FacebookResult>(url));
      return data;
    } catch (e: any) {
      const { response: res }: AxiosError<FacebookException> = e;
      throw new BadRequestException(res?.data.error.message);
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
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async getLinkedInData(accessToken) {
    try {
      const url = 'https://api.linkedin.com/v1/people/~?format=json';
      const headers = { Authorization: `Bearer ${accessToken}` };
      const { data } = await lastValueFrom(await this.http.get<LinkedinResult>(url, { headers }));
      return data;
    } catch (e: any) {
      const { response: res }: AxiosError<LinkedinException> = e;
      throw new BadRequestException(res?.data.message);
    }
  }
}
