import { Inject } from '@nestjs/common';

import { MONGOOSE_TOKEN } from './mongoose.constant';

export const InjectMongoose = () => Inject(MONGOOSE_TOKEN);
