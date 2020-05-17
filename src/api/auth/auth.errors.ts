import { BadRequestException } from '@nestjs/common';

export class InvalidAccountError extends BadRequestException {
  constructor() {
    super('Invalid username or password.');
  }
}
