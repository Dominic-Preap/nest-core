import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

import { UserSchema } from './user.schema';

export class AuditSchema {
  /**
   * Request method (GET, POST, PUT, DELETE)
   */
  @prop({ required: true })
  method!: string;

  /**
   * Request url
   */
  @prop({ required: true })
  url!: string;

  /**
   * HTTP request body as JSON stringify
   */
  @prop()
  body!: string;

  /**
   * HTTP response result as JSON stringify
   */
  @prop({ required: true })
  result!: string;

  /**
   * HTTP request duration
   */
  @prop({ required: true })
  duration!: number;

  /**
   * Request time
   */
  @prop({ required: true })
  time!: Date;

  /**
   * User who request the endpoint
   */
  @prop({ ref: UserSchema, default: null })
  userId!: Ref<UserSchema>;

  /**
   * Username in case the user is delete
   */
  @prop()
  username!: string;

  /**
   * Server controller name
   */
  @prop()
  className!: string;

  /**
   * Server controller method
   */
  @prop()
  handler!: string;
}

export const Audit = getModelForClass(AuditSchema, {
  schemaOptions: { collection: 'Audits' },
  existingMongoose: mongoose
});
