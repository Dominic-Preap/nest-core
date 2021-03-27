import { Test } from '@nestjs/testing';

import { ConfigModule } from '@lib/config';
import { JwtModule } from '@lib/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule, JwtModule],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(() => ({ accessToken: 'ACCESS_TOKEN' })),
            authorize: jest.fn(() => ({ token: 'TOKEN' }))
          }
        }
      ]
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should return access token', async () => {
      const body = { username: 'john', password: 'doe' };
      const result = { accessToken: 'ACCESS_TOKEN' };
      expect(await authController.login(body)).toMatchObject(result);
    });
  });

  describe('authorize', () => {
    it('should return token', async () => {
      const body = { clientId: 'x' };
      const header = { udid: 'x' };
      const result = { token: 'TOKEN' };
      expect(await authController.authorize(body, header as any)).toMatchObject(result);
    });
  });
});
