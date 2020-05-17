import { getModelForClass, prop } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

import { T } from '@common';

export class UserSchema {
  @prop({ required: true })
  firstName!: string;

  @prop({ required: true })
  lastName!: string;

  @prop({ required: true })
  username!: string;

  @prop({ required: true })
  password!: string;

  @prop({ enum: T.RoleEnum })
  role!: T.RoleType;

  @prop({ required: true, default: false })
  isArchived!: boolean;

  @prop({ required: true, default: Date.now })
  createdAt!: Date;

  @prop({ required: true })
  createdBy!: string;

  @prop({ required: true, default: Date.now })
  updatedAt!: Date;

  @prop({ required: true })
  updatedBy!: string;
}

export const User = getModelForClass(UserSchema, {
  schemaOptions: { collection: 'Users', timestamps: true },
  existingMongoose: mongoose
});
