import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { resolve } from 'path';

import { AppExceptionFilter, swaggerDescription, swaggerOptions } from '@common';
import { ConfigModule, ConfigService } from '@lib/config';

import { AuthGuard } from './api/auth/auth.guard';
import { AuthModule } from './api/auth/auth.module';
import { ApplicationModule } from './app.module';

// Use this instead `AuthGuard` if you are using `auth0`
// import { Auth0Guard } from './api/auth/auth0.guard';

declare const module: any;

async function bootstrap() {
  // ! This is for localhost development only
  // http://backend.pathmazing.com/docs/tips/localhost-certificate
  // const httpsOptions = {
  //   key: readFileSync(resolve('.', 'config', 'ssl', 'localhost-key.pem')),
  //   cert: readFileSync(resolve('.', 'config', 'ssl', 'localhost.pem'))
  // };
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);

  // =================================
  // configureExpressSettings
  // =================================
  app.set('etag', 'strong');
  app.set('trust proxy', true);
  app.set('x-powered-by', false);

  // =================================
  // configureExpressMiddleware
  // =================================
  // app.use('/', express.static('public'));
  app.enableCors({ origin: true });
  app.setViewEngine('pug');
  app.setBaseViewsDir(resolve('.', 'views'));
  app.useStaticAssets(resolve('.', 'public'));
  app.use(express.json({ limit: '5mb' }));
  app.use(compression());
  app.use(helmet());
  app.use(morgan('dev'));

  // =================================
  // configureNestGlobals
  // =================================
  const config = app.select(ConfigModule).get(ConfigService, { strict: true });
  const authGuard = app.select(AuthModule).get(AuthGuard);

  // app.useWebSocketAdapter(new RedisIoAdapter(app, config));
  app.useGlobalGuards(authGuard);
  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      errorHttpStatusCode: 422
    })
  );

  // =================================
  // configureNestSwagger
  // =================================
  if (config.env.NODE_ENV === 'development') {
    const options = new DocumentBuilder()
      .setTitle('backend-core-project')
      .setContact('Dominic Preap', 'https://github.com/Dominic-Preap', 'preapchanoudom@gmail.com')
      .setDescription(swaggerDescription)
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    // https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document, { swaggerOptions });
  }

  // =================================
  // configureNestConfig
  // =================================
  const port = config.env.PORT;
  await app.listen(port).then(x => console.log(`Listen on port ${port}`));

  // =================================
  // configureNestHotReload
  // =================================
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
