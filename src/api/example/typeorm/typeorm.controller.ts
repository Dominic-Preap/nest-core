import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '@entities';
import { UserRepository } from '@repositories';

@ApiTags('Example - TypeORM')
@Controller('example/typeorm')
export class TypeORMController {
  constructor(
    @InjectRepository(UserEntity) private readonly user: Repository<UserEntity>,
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository
  ) {}

  @Get()
  async get() {
    return this.user.find({ select: ['id', 'email', 'status'], take: 5, order: { id: 'DESC' } });
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
