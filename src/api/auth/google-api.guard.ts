import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GoogleAPIGuard implements CanActivate {
  private URL = 'https://oauth2.googleapis.com/tokeninfo';
  private EMAIL = 'cloud-scheduler@testing.iam.gserviceaccount.com';

  constructor(private readonly http: HttpService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const authToken = req.get('authorization') || '';
    const [scheme, token] = authToken.split(' ');
    // console.log('scheme', scheme);
    // console.log('token', token);
    if (scheme.toLowerCase() !== 'bearer')
      throw new UnauthorizedException('Invalid Authorization Scheme');
    if (!token) throw new UnauthorizedException('Authorization token is missing.');

    const data = await this.decode(token);
    if (data.email !== this.EMAIL) {
      throw new ForbiddenException('Invalid credential');
    }
    return true;
  }

  async decode(token: string) {
    try {
      const { data } = await lastValueFrom(
        this.http.get<GoogleTokenInfo>(this.URL, { params: { id_token: token } })
      );

      return data;
    } catch (error) {
      throw new UnauthorizedException('Cannot validate token from google');
    }
  }
}

interface GoogleTokenInfo {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: string;
  iat: string;
  iss: string;
  sub: string;
  alg: string;
  kid: string;
  typ: string;
}
