import { Controller, Get, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Sequelize } from 'sequelize-typescript';

import { UserModel } from '@models';

@ApiBearerAuth()
@ApiTags('Example - Sequelize')
@Controller('example/sequelize')
export class SequelizeController {
  constructor(private db: Sequelize, @InjectModel(UserModel) private userModel: typeof UserModel) {}

  @Get('testing')
  @ApiOperation({ summary: 'Testing' })
  testing() {
    return this.db.query('select 1 + 1 as sum', { plain: true });
  }

  @Post('users')
  @ApiOperation({ summary: 'Get users' })
  users() {
    // await this.user.create({
    //   auth0Id: '1',
    //   firstName: 'Chanoudom',
    //   lastName: 'Preap',
    //   nickName: 'Dominic',
    //   email: 'dominic@testing.com',
    //   phone: '08551111111'
    // } as any);

    return this.userModel.$findAndCountAll({ firstName: 'dom', limit: 1, offset: 0 });
  }
}
