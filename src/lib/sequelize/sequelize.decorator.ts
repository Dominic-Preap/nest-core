import { Inject } from '@nestjs/common';

import { SEQUELIZE_TOKEN } from './sequelize.constant';

export const InjectSequelize = () => Inject(SEQUELIZE_TOKEN);
