import { getModelForClass, mongoose, prop } from '@typegoose/typegoose';

class AuditSchema {
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
  @prop({ default: null })
  userId?: mongoose.Types.ObjectId;

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

export const AuditModel = getModelForClass(AuditSchema, {
  schemaOptions: { collection: 'Audits' }
});
