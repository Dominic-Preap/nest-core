import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AuthModule } from '../src/api/auth/auth.module';
import { ConfigModule } from '../src/lib/config';
import { MongooseModule } from '../src/lib/mongoose';

describe('/POST auth/login', () => {
  let app: INestApplication;
  const authService = { login: () => ['test'] };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule, ConfigModule, MongooseModule]
    })
      // .overrideProvider(AuthService)
      // .useValue(authService)

      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`login successful`, async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'richard.houn', password: '11111' });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      user: {
        firstName: 'richard212222',
        lastName: 'houn122222',
        username: 'richard.houn'
      }
    });
  });

  it(`login with no account`, async () => {
    const res = await request(app.getHttpServer()).post('/auth/login');

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({ message: 'Account information provided does not exist.' });
  });

  it(`login with incorrect password`, async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'richard.houn', password: 'xxx' });

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({ message: 'Password is incorrect.' });
  });

  afterAll(async () => {
    await app.close();
  });
});
