import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { DynamoDBModule } from '@dynamodb';
import { Auth0Module } from '@lib/auth0';
import { AWSModule } from '@lib/aws';
import { ConfigModule } from '@lib/config';
import { CryptoModule } from '@lib/crypto';
import { FirebaseAdminModule } from '@lib/firebase-admin';
import { GoogleCloudStorageModule } from '@lib/google-cloud-storage';
import { I18NextModule } from '@lib/i18next';
import { IORedisModule } from '@lib/ioredis';
import { JwtModule } from '@lib/jwt';
import { KeycloakModule } from '@lib/keycloak';
import { MailerModule } from '@lib/mailer';
import { MediaStreamModule } from '@lib/media-stream';
import { MongooseModule } from '@lib/mongoose';
import { SendBirdModule } from '@lib/sendbird';
import { SequelizeModule } from '@lib/sequelize';
import { SocialModule } from '@lib/social';
import { SocketModule } from '@lib/socket';
import { TwilioModule } from '@lib/twilio';
import { TypeOrmModule } from '@lib/typeorm';
import { WowzaModule } from '@lib/wowza';

import { ApiModule } from './api/api.module';

@Module({
  imports: [
    AWSModule,
    Auth0Module,
    ApiModule,
    ConfigModule,
    CryptoModule,
    DynamoDBModule,
    FirebaseAdminModule,
    GoogleCloudStorageModule,
    I18NextModule,
    IORedisModule,
    KeycloakModule,
    JwtModule,
    MailerModule,
    MediaStreamModule,
    MongooseModule,
    ScheduleModule.forRoot(),
    SendBirdModule,
    SequelizeModule,
    SocialModule,
    SocketModule,
    TypeOrmModule,
    TwilioModule,
    WowzaModule
  ]
})
export class ApplicationModule {}
