import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@entities';
import { UserRepository } from '@repositories';

@ApiTags('Example - TypeORM')
@Controller('example/typeorm')
export class TypeORMController {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository
  ) {}

  @Get()
  async get() {
    const a = await this.user.find({ select: ['id', 'email', 'status'], take: 5, order: { id: 'DESC' } });
    console.log(a);
    return a;
  }

  @Post()
  post() {
    return this.user.insert({
      // username: 'my-username',
      // password: 'my-password',
      // isArchived: false
    });
  }

  @Get('repository')
  getRepository() {
    return this.userRepository.$findAndCountAll({ organizationId: 1, name: 'dom' });
  }
}
