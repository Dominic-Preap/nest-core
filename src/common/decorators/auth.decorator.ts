import { SetMetadata } from '@nestjs/common';

export const Auth = (...roles: ('admin' | 'user')[]) => SetMetadata('roles', roles);
