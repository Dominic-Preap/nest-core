import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { LoginBody } from './auth.dto';
import { InvalidAccountError } from './auth.errors';

@Injectable()
export class AuthService {
  constructor(private readonly service: JwtService) {}

  async authorize(clientId: string, udid: string) {
    const data = { clientId, udid, timestamp: Date.now() };
    const token = await this.service.signAsync(data, { expiresIn: 60 });
    return { token };
  }

  async login({ username, password }: LoginBody) {
    // TODO: use your own user table
    // const user = await User.findOne({ username });
    const user = {
      id: 1,
      username: 'my-username',
      password: '$2y$12$yY/PpVYPizAclFCrNI112esVbtr40vkBtCoTSQowHvev/al.rKlW.', // 'my-password',
      isArchived: false
    };

    // Check if user exist and active, then compare the password
    if (!user || user.isArchived) throw new InvalidAccountError();
    if (!(await compare(password, user.password))) throw new InvalidAccountError();

    // Generate auth user token
    const data = { id: user.id, username, loginDate: new Date().toISOString() };
    const accessToken = await this.service.signAsync(data, { noTimestamp: true });
    return { user, accessToken };
  }
}
