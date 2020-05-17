import { getModelForClass, prop } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

export class ClientAppSchema {
  /**
   * Name of Client App (eg: IOS, Android, Web)
   */
  @prop({ required: true })
  name!: string;

  @prop({ required: true, unique: true })
  clientId!: string;

  @prop({ required: true, unique: true })
  clientSecret!: string;
}

export const ClientApp = getModelForClass(ClientAppSchema, {
  schemaOptions: { collection: 'ClientApps', timestamps: true },
  existingMongoose: mongoose
});
