<img src="https://docs.nestjs.com/assets/logo-small.svg" alt="logo" align="right" width="100" />

# Nest Boilerplate Project

_Nest Boilerplate Project is powered by [Nest](https://nestjs.com/)_

_Please use a template from [README.sample.md](README.sample.md) for your real project README.md. An example can be found in [README.example.md](README.example.md)_

# 📋 Introduction

Powered by Nest and Typescript, this boilerplate project will make your life easier when setup a new project without worrying too much about the architecture, routing, validation, middleware, ...etc. This boilerplate project can be fully customized to your needs.

Thanks to VSCode and Typescript, we will have a fully intellisense when coding. No more magic function names appear out of nowhere, or some global functions that we have no idea where it is located.

We want to hear your feedback and your suggestion on this project to make it more powerful, robust and dynamic.

> Also Read [How to become a back-end developer](docs/guide.md)

# 🏁️️ Getting Started

## Prerequisite

- [Node LTS](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/)

## Commands

Check your environment variables

> To set your application environment variables create a `.env` file. There is an `.env.example` file to follow.

Install dependencies

```bash
yarn install
```

Run in development environment

```bash
# running nodemon
yarn dev
```

Run in production environment

```bash
# compile typescript
yarn build

# compile and run with pm2
yarn start
```

# 📦 Architecture

- [Project Structure](#project-structure)
- [Built-in Modules](#built-in-modules)
- [How to start the project](#how-to-start-the-project)

## Project Structure

Structure your solution by self-contained components

```sh
•
├── 📁assets    # Contain any files for your app. ex: email template, static data json
├── 📁config    # Contain any configuration from a third party library. ex: firebase config
├── 📁public    # Contain access files via public
├── 📁src       # Main directory that stores all the business logic
│   ├── 📁api           # Yes, Api you know it
│   ├── 📁common        # Contain your custom functions
│   ├── 📁lib           # Built-In modules
│   ├── 📁models        # Contain Sequelize models
│   ├── 📁queries       # Contain raw SQL files
│   ├── 📁schema        # Contain Mongodb schema
│   ├── 📄app.module.ts # Contain in-app modules
│   └── 📄index.ts      # Server configuration and startup
```

## Built-in Modules

- [Config](docs/projects/config.md)
- [Firebase Admin](docs/projects/firebase-admin.md)
- [Google Cloud Storage](docs/projects/google-cloud-storage.md)
- [Mailer](docs/projects/mailer.md)
- [Mongoose](docs/projects/mongoose.md)
- [Redis](docs/projects/redis.md)
- [S3](docs/projects/s3.md)
- [Sequelize](docs/projects/sequelize.md)
- Socket
- Authentication
- Cron Scheduler
- Multer Upload
- Social
- Excel

## How to start the project

This project will not have the feature you need or you don't need any of our features. To simply start to project, you have to take a look into some files.

### The main entry point: `index.ts`

This project is no doubt using express as a default. If you are familiar with express then you are good to go. You can set any configuration, setting, middleware, document within this file.

```ts
async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  // =================================
  // configureExpressSettings
  // =================================
  app.set();

  // =================================
  // configureExpressMiddleware
  // =================================
  app.use();

  // =================================
  // configureNestGlobals
  // =================================
  app.useGlobalGuards();
  app.useGlobalFilters();
  app.useGlobalPipes();

  // =================================
  // configureNestSwagger
  // =================================
  const options = new DocumentBuilder()
    .setTitle('Nest Boilerplate Project')
    .setContact('Dominic Preap', 'https://github.com/Dominic-Preap', 'preapchanoudom@gmail.com')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
}
```

### Set your own modules: `app.module.ts`

This file controls all of your module. The required module for this file is `ApiModule` and `ConfigModule`. Un-comment the module that you need.

- `ApiModule` stores every route handlers, business logic, and task scheduler as such.
- `ConfigModule` stores and validates environment file `.env`.

```ts
import { Module } from '@nestjs/common';

import { ConfigModule } from '@lib/config';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ApiModule, ConfigModule]
})
export class ApplicationModule {}
```
