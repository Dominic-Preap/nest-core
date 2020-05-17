import { Test } from '@nestjs/testing';

import { ConfigModule } from '../../lib/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('CatsController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [AuthController],
      providers: [AuthService]
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should return true', async () => {
      const result = true;
      jest.spyOn(authService, 'login').mockImplementation(() => result);
      expect(await authController.login({ username: 'A', password: 'A' })).toBe(result);
    });
  });
});
