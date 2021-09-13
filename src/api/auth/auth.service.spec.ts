import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { ConfigModule } from '@lib/config';
import { JwtModule } from '@lib/jwt';

import { InvalidAccountError } from './auth.errors';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule, JwtModule],
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: { signAsync: jest.fn(() => 'ACCESS_TOKEN') }
        }
      ]
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return access token', async () => {
      const result = await authService.login({ username: 'my-username', password: 'my-password' });
      expect(result).toMatchObject({ accessToken: 'ACCESS_TOKEN' });
    });

    it('should throw error when account is incorrect', async () => {
      try {
        await authService.login({ username: 'fake', password: 'wrong' });
      } catch (e: any) {
        expect(e).toBeInstanceOf(InvalidAccountError);
        expect(e.message).toMatch('Invalid username or password.');
      }
    });
  });

  describe('authorize', () => {
    it('should return authorize token', async () => {
      const result = await authService.authorize('clientId', 'uuid');
      expect(result).toMatchObject({ token: 'ACCESS_TOKEN' });
    });
  });
});
