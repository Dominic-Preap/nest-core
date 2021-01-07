import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { getModelToken } from './mongoose.util';

export const InjectModel = (model: Model<any>) => Inject(getModelToken(model.modelName));
