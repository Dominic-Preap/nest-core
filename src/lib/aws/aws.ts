import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';

import { AWSConfig } from './aws.dto';

export class AWSLib {
  public cognito: AWS.CognitoIdentityServiceProvider;
  public dynamodb: AWS.DynamoDB;
  public ec2: AWS.EC2;
  public elasticbeanstalk: AWS.ElasticBeanstalk;
  public metadata: AWS.MetadataService;
  public mapper: DataMapper;
  public s3: AWS.S3;
  public ses: AWS.SES;
  public sns: AWS.SNS;

  private logger: Logger = new Logger('AWSModule');

  constructor(public readonly config: AWSConfig) {
    AWS.config.update({
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
      region: config.AWS_REGION
    });

    this.cognito = new AWS.CognitoIdentityServiceProvider();
    this.dynamodb = new AWS.DynamoDB();
    this.ec2 = new AWS.EC2();
    this.elasticbeanstalk = new AWS.ElasticBeanstalk();
    this.metadata = new AWS.MetadataService();
    this.s3 = new AWS.S3();
    this.ses = new AWS.SES();
    this.sns = new AWS.SNS();
    this.mapper = new DataMapper({
      client: this.dynamodb, // the SDK client used to execute operations
      tableNamePrefix: this.config.AWS_DYNAMODB_PREFIX // optionally, you can provide a table prefix to keep your dev and prod tables separate
    });

    this.logger.log('AWS loaded');
  }
}
