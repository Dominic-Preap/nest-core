'use strict';
const _ = require('lodash');
const fs = require('fs');
const readline = require('readline');
const rimraf = require('rimraf');
const { resolve } = require('path');

const PROMPT_LIBS = 'libs';
const PROMPT_SUB_LIBS = 'sub-libs';
const PROMPT_EXAMPLES = 'examples';
const PROMPT_PROJECT_NAME = 'project-name';
const PROJECT = '@PROJECT';

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  // ########################################################
  // REMOVED EXISTING PROJECT DIRECTORY
  // ########################################################
  rimraf(resolve('.', PROJECT), err => null);

  // ########################################################
  // DEFINE USER ACTION STEPS BEFORE INITIALIZE THE PROJECT
  // ########################################################

  const inputProjectName = {
    type: 'input',
    name: PROMPT_PROJECT_NAME,
    message: 'What is your project name?',
    validate: value => {
      if (/.+/.test(value)) return true;
      return 'Please input your project name !!!';
    }
  };

  // prettier-ignore
  const selectLibraries = {
    type: 'checkbox',
    name: PROMPT_LIBS,
    message: 'Choose The Main Libraries',
    pageSize: 20,
    choices: [
      { name: 'Auth0',                value: 'auth0' },
      { name: 'AWS',                  value: 'aws' },
      { name: 'Firebase Admin',       value: 'firebase-admin' },
      { name: 'Google Cloud Storage', value: 'google-cloud-storage' },
      { name: 'Keycloak',             value: 'keycloak' },
      { name: 'I18Next',              value: 'i18next' },
      { name: 'IORedis',              value: 'ioredis' },
      { name: 'Mailer',               value: 'mailer' },
      { name: 'Media Stream',         value: 'media-stream' },
      { name: 'Mongoose',             value: 'mongoose' },
      { name: 'Pagination Helper',    value: 'pagination' },
      { name: 'SendBird',             value: 'sendbird' },
      { name: 'Sequelize',            value: 'sequelize' },
      { name: 'Social',               value: 'social' },
      { name: 'Socket',               value: 'socket' },
      { name: 'TypeORM',              value: 'typeorm' },
      { name: 'Twilio',               value: 'twilio' },
      { name: 'Wowza',                value: 'wowza' },
    ]
  };

  // prettier-ignore
  const selectSubLibraries = {
    type: 'checkbox',
    name: PROMPT_SUB_LIBS,
    message: 'Choose The Sub Libraries / Helpers',
    pageSize: 20,
    choices: [
      { name: 'Archiver (download as zip file)',                  value: 'archiver' },
      { name: 'Cache Manager (check usage in Nestjs document)',   value: 'cache-manager' },
      { name: 'DayOffCalculation Helper (for specific purpose)',  value: 'dayoff' },
      { name: 'DynamoDB Data Mapper',                             value: 'dynamodb' },
      { name: 'ExcelJS (helper to generate excel file)',          value: 'excel' },
      { name: 'PDFMake (helper to generate pdf file)',            value: 'pdfmake' },
      { name: 'Sanitize HTML (used in DTO decorator)',            value: 'sanitize-html' },
      { name: 'Sharp (image manipulation)',                       value: 'sharp' },
      { name: 'Soap (classic bitch !!!)',                         value: 'soap' },
      { name: 'Upload Image/File API Helper',                     value: 'upload' },
      { name: 'Validation Phone Number Helper',                   value: 'validate-phone' },
    ]
  };

  const askingForExamples = {
    type: 'confirm',
    name: PROMPT_EXAMPLES,
    message: 'Do you want examples from the core project?'
  };
  // ########################################################
  // GENERATE NEW PROJECT ACTIONS
  // ########################################################

  function addMainLibraries(libraries = []) {
    const actions = [];
    const base = `src/lib`;
    const destination = `${PROJECT}/${base}`;

    libraries.push('config');
    libraries.push('crypto');
    libraries.push('jwt');

    for (const library of libraries) {
      const templateFiles = [`${base}/${library}/**/*.ts`];
      actions.push({
        type: 'addMany',
        base,
        destination,
        templateFiles,
        verbose: false,
        abortOnFail: true
      });
    }

    return actions;
  }

  function addConfigFolders() {
    // prettier-ignore
    const folders = [
      // { d: `${PROJECT}/assets`,              b: 'public',                f: ['public/.gitkeep'] },
      { d: `${PROJECT}/.vscode`,                b: '.vscode',               f: ['.vscode/*'] },
      { d: `${PROJECT}/assets/templates`,       b: 'assets/templates',      f: ['assets/templates/*'] },
      { d: `${PROJECT}/assets/locales`,         b: 'assets/locales',        f: ['assets/locales/**/*'] },
      { d: `${PROJECT}/config`,                 b: 'public',                f: ['public/.gitkeep'] },
      { d: `${PROJECT}/docs`,                   b: 'public',                f: ['public/.gitkeep'] },
      { d: `${PROJECT}/e2e`,                    b: 'e2e',                   f: ['e2e/*'] },
      { d: `${PROJECT}/public`,                 b: 'public',                f: ['public/*', 'public/.gitkeep'] },
      { d: `${PROJECT}/typings`,                b: 'typings',               f: ['typings/*'] },
      // =====================================================================================================
      { d: `${PROJECT}/src/api/auth`,           b: 'src/api/auth',          f: ['src/api/auth/*'] },
      { d: `${PROJECT}/src/api/cron`,           b: 'src/api/cron',          f: ['src/api/cron/*'] },
      { d: `${PROJECT}/src/api/example`,        b: 'src/api/example',       f: ['src/api/example/**/*'] },
      { d: `${PROJECT}/src/api/shared`,         b: 'src/api/shared',        f: ['src/api/shared/shared.module.ts'] },
      { d: `${PROJECT}/src/api/soap`,           b: 'src/api/soap',          f: ['src/api/soap/**/*'] },
      { d: `${PROJECT}/src/api/upload`,         b: 'src/api/upload',        f: ['src/api/upload/**/*'] },
      { d: `${PROJECT}/src/api`,                b: 'src/api',               f: ['src/api/api.module.ts'] },
      { d: `${PROJECT}/src/common`,             b: 'src/common',            f: ['src/common/**/*'] },
      { d: `${PROJECT}/src/dynamodb`,           b: 'src/dynamodb',          f: ['src/dynamodb/**/*'] },
      { d: `${PROJECT}/src`,                    b: 'src',                   f: ['src/app.module.ts', 'src/main.ts'] },
    ];

    const actions = folders.map(({ b, d, f }) => ({
      type: 'addMany',
      base: b,
      destination: d,
      templateFiles: f,
      verbose: false,
      abortOnFail: true
    }));

    return actions;
  }

  function addDatabaseFolders(libraries = []) {
    const mongoose = libraries.find(x => x === 'mongoose');
    const sequelize = libraries.find(x => x === 'sequelize');
    const typeorm = libraries.find(x => x === 'typeorm');

    const schema = mongoose ? [{ d: `${PROJECT}/src/schema`, b: 'src/schema', f: ['src/schema/*'] }] : [];
    const models = sequelize
      ? [
          { d: `${PROJECT}/src/models`, b: 'src/models', f: ['src/models/*'] },
          { d: `${PROJECT}/src/queries/user`, b: 'src/queries/user', f: ['src/queries/user/*'] }
        ]
      : [];
    const entities = typeorm
      ? [
          { d: `${PROJECT}/src/entities`, b: 'src/entities', f: ['src/entities/*'] },
          { d: `${PROJECT}/src/repositories`, b: 'src/repositories', f: ['src/repositories/*'] }
        ]
      : [];

    const folders = [...schema, ...models, ...entities];
    const actions = folders.map(({ b, d, f }) => ({
      type: 'addMany',
      base: b,
      destination: d,
      templateFiles: f,
      verbose: false,
      abortOnFail: true
    }));
    return actions;
  }

  function addConfigFiles() {
    const files = [
      ['.commitlintrc.json'],
      ['.editorconfig'],
      ['.env.example'],
      ['.eslintrc.js'],
      ['.gitignore'],
      ['.prettierrc'],
      ['README.sample.md', 'README.md'],
      ['jest.json'],
      ['nest-cli.json'],
      ['package.json'],
      ['process.json'],
      ['tsconfig.build.json'],
      ['tsconfig.json'],
      ['webpack.config.js']
    ];

    const actions = files.map(file => ({
      type: 'add',
      path: `${PROJECT}/${file[1] || file[0]}`,
      templateFile: file[0],
      abortOnFail: true
    }));

    return actions;
  }

  function changeProjectName() {
    const defaultAction = {
      type: 'modify',
      pattern: new RegExp('backend-core-project', 'gi'),
      path: 'x',
      template: 'x'
    };

    const actions = [
      { ...defaultAction, path: `${PROJECT}/package.json`, template: `{{lowerCase ${PROMPT_PROJECT_NAME}}}` },
      { ...defaultAction, path: `${PROJECT}/process.json`, template: `{{dashCase ${PROMPT_PROJECT_NAME}}}` },
      { ...defaultAction, path: `${PROJECT}/src/main.ts`, template: `{{titleCase ${PROMPT_PROJECT_NAME}}}` }
    ];

    return actions;
  }

  function checkingDependencies(answer) {
    const libs = answer[PROMPT_LIBS];
    const subLibs = answer[PROMPT_SUB_LIBS];
    const path = `${PROJECT}/package.json`;
    const json = JSON.parse(fs.readFileSync(path));

    // * prerequisite dependencies
    // ===========================
    const main = [
      '@nestjs/cli',
      '@nestjs/common',
      '@nestjs/config',
      '@nestjs/core',
      '@nestjs/jwt',
      '@nestjs/microservices',
      '@nestjs/platform-express',
      '@nestjs/schedule',
      '@nestjs/swagger',
      '@nestjs/testing',
      'bcryptjs',
      'class-transformer',
      'class-validator',
      'compression',
      'cross-env',
      'debug',
      'helmet',
      'lodash',
      'mime-types',
      'moment',
      'moment-timezone',
      'morgan',
      'pug',
      'reflect-metadata',
      'rxjs',
      'shelljs',
      'swagger-ui-express',

      // DEV
      '@commitlint/cli',
      '@commitlint/config-angular',
      '@commitlint/config-conventional',
      '@types/bcryptjs',
      '@types/compression',
      '@types/express',
      '@types/jest',
      '@types/lodash',
      '@types/mime-types',
      '@types/morgan',
      '@types/multer',
      '@types/pug',
      '@types/shelljs',
      '@types/supertest',
      '@types/uuid',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'eslint',
      'eslint-config-prettier',
      'eslint-plugin-import',
      'eslint-plugin-prettier',
      'husky',
      'jest',
      'lint-staged',
      'prettier',
      'rimraf',
      'supertest',
      'ts-jest',
      'ts-loader',
      'typescript'
    ];

    // https://stackoverflow.com/questions/30726830/how-to-filter-keys-of-an-object-with-lodash
    const dependencies = _.pickBy(json.dependencies, (value, key) => main.includes(key));
    const devDependencies = _.pickBy(json.devDependencies, (value, key) => main.includes(key));

    // * dependencies for specific main / sub libraries
    // ================================================
    const libPackages = {
      'firebase-admin': ['firebase-admin'],
      'google-cloud-storage': ['@google-cloud/storage'],
      'media-stream': ['node-media-server'],
      auth0: [
        '@nestjs/passport',
        'auth0',
        'jwks-rsa',
        'passport',
        'passport-jwt',
        '@types/auth0',
        '@types/passport-jwt'
      ],
      aws: ['aws-sdk'],
      config: [],
      crypto: [],
      dynamodb: ['@aws/dynamodb-data-mapper', '@aws/dynamodb-data-mapper-annotations'],
      keycloak: [
        '@nestjs/passport',
        'jwks-rsa',
        'keycloak-admin',
        'openid-client',
        'passport',
        'passport-jwt',
        '@types/passport-jwt'
      ],
      i18next: ['i18next', 'i18next-express-middleware', 'i18next-node-fs-backend'],
      ioredis: ['ioredis', '@types/ioredis'],
      jwt: [],
      mailer: ['nodemailer', '@types/nodemailer'],
      mongoose: ['mongoose', '@typegoose/typegoose', '@types/mongoose'],
      pagination: [],
      sendbird: ['form-data'],
      sequelize: [
        'callsites',
        'mysql2',
        'sequelize',
        'sequelize-typescript',
        'string-template',
        '@types/callsite',
        '@types/node',
        '@types/string-template'
      ],
      social: ['google-auth-library', 'twitter'],
      socket: [
        '@nestjs/websockets',
        '@nestjs/platform-socket.io',
        '@types/socket.io',
        'socket.io-redis',
        '@types/socket.io-redis'
      ],
      typeorm: ['@nestjs/typeorm', 'mysql2', 'typeorm'],
      twilio: ['twilio'],
      wowza: [],
      // -------------------------------------------------
      'cache-manager': ['cache-manager'],
      'sanitize-html': ['sanitize-html', '@types/sanitize-html', 'html-entities', '@types/html-entities'],
      archiver: ['archiver', '@types/archiver'],
      dayoff: ['moment-range'],
      excel: ['exceljs'],
      pdfmake: ['pdfmake'],
      sharp: ['sharp', '@types/sharp'],
      soap: ['soap'],
      upload: [],
      'validate-phone': ['libphonenumber-js']
    };

    for (const lib of [...libs, ...subLibs]) {
      const libDependencies = _.pickBy(json.dependencies, (value, key) => libPackages[lib].includes(key));
      const libDevDependencies = _.pickBy(json.devDependencies, (value, key) => libPackages[lib].includes(key));
      Object.assign(dependencies, libDependencies);
      Object.assign(devDependencies, libDevDependencies);
    }

    // Final package.json
    // ============================================
    json.version = '0.0.1'; // set default version
    delete json.scripts.generate; // remove plop script

    // https://github.com/lodash/lodash/issues/1459
    const result = {
      ...json,
      dependencies: _(dependencies).toPairs().sortBy(0).fromPairs().value(), // prettier-ignore
      devDependencies: _(devDependencies).toPairs().sortBy(0).fromPairs().value() // prettier-ignore
    };

    fs.writeFileSync(path, JSON.stringify(result, null, 2));
    return plop.renderString('Everything OK !!!');
  }

  function removeUnusedComponents(answer) {
    const libraries = answer[PROMPT_LIBS];
    const subLibraries = answer[PROMPT_SUB_LIBS];
    const example = answer[PROMPT_EXAMPLES];

    const srcPath = `${PROJECT}/src`;
    const commonPath = `${PROJECT}/src/common`;
    const dynamodbPath = `${PROJECT}/src/dynamodb`;
    const examplePath = `${PROJECT}/src/api/example`;
    const soapPath = `${PROJECT}/src/api/soap`;
    const uploadPath = `${PROJECT}/src/api/upload`;

    // ------------------------------------------------------------------
    const auth0       = libraries.every(x => x !== 'auth0'); // prettier-ignore
    const aws         = libraries.every(x => x !== 'aws'); // prettier-ignore
    const fbadmin     = libraries.every(x => x !== 'firebase-admin'); // prettier-ignore
    const gcloud      = libraries.every(x => x !== 'google-cloud-storage'); // prettier-ignore
    const i18next     = libraries.every(x => x !== 'i18next'); // prettier-ignore
    const ioredis     = libraries.every(x => x !== 'ioredis'); // prettier-ignore
    const keycloak    = libraries.every(x => x !== 'keycloak'); // prettier-ignore
    const mailer      = libraries.every(x => x !== 'mailer'); // prettier-ignore
    const media       = libraries.every(x => x !== 'media-stream'); // prettier-ignore
    const mongoose    = libraries.every(x => x !== 'mongoose'); // prettier-ignore
    const sendbird    = libraries.every(x => x !== 'sendbird'); // prettier-ignore
    const sequelize   = libraries.every(x => x !== 'sequelize'); // prettier-ignore
    const social      = libraries.every(x => x !== 'social'); // prettier-ignore
    const socket      = libraries.every(x => x !== 'socket'); // prettier-ignore
    const typeorm     = libraries.every(x => x !== 'typeorm'); // prettier-ignore
    const twilio      = libraries.every(x => x !== 'twilio'); // prettier-ignore
    const wowza       = libraries.every(x => x !== 'wowza'); // prettier-ignore

    // ------------------------------------------------------------------
    // const archiver = subLibraries.every(x => x !== 'archiver');
    // const sharp = subLibraries.every(x => x !== 'sharp');
    const dayoff      = subLibraries.every(x => x !== 'dayoff'); // prettier-ignore
    const dynamodb    = subLibraries.every(x => x !== 'dynamodb'); // prettier-ignore
    const excel       = subLibraries.every(x => x !== 'excel'); // prettier-ignore
    const pdfmake     = subLibraries.every(x => x !== 'pdfmake'); // prettier-ignore
    const sanitize    = subLibraries.every(x => x !== 'sanitize-html'); // prettier-ignore
    const soap        = subLibraries.every(x => x !== 'soap'); // prettier-ignore
    const upload      = subLibraries.every(x => x !== 'upload'); // prettier-ignore
    const valPhone    = subLibraries.every(x => x !== 'validate-phone'); // prettier-ignore
    // ------------------------------------------------------------------
    if (excel)      rimraf(resolve(commonPath, 'classes', 'excel.class.ts'), () => null); // prettier-ignore
    if (dayoff)     rimraf(resolve(commonPath, 'classes', 'dayoff-calculation.class.ts'), () => null); // prettier-ignore
    if (dynamodb)   rimraf(resolve(dynamodbPath), () => null); // prettier-ignore
    if (sanitize)   rimraf(resolve(commonPath, 'transformers', 'sanitize-html.transformer.ts'), () => null); // prettier-ignore
    if (valPhone)   rimraf(resolve(commonPath, 'validators', 'is-phone-number.validator.ts'), () => null); // prettier-ignore
    if (soap)       rimraf(resolve(soapPath), () => null); // prettier-ignore
    if (upload)     rimraf(resolve(uploadPath), () => null); // prettier-ignore
    if (!example)   rimraf(resolve(examplePath), () => null); // prettier-ignore

    // =========================================================================================
    //
    // =========================================================================================
    let finalCommonIndex = '';
    const commonIndex = resolve(commonPath, 'index.ts');
    const lineReader = readline.createInterface({ input: fs.createReadStream(commonIndex) });
    lineReader.on('close', () => fs.writeFile(commonIndex, finalCommonIndex, () => null));
    lineReader.on('line', line => {
      const replace =
        (dayoff && line.includes('dayoff-calculation.class')) ||
        (excel && line.includes('excel.class')) ||
        (pdfmake && line.includes('pdfmake.class')) ||
        (sanitize && line.includes('sanitize-html.transformer'));

      finalCommonIndex += (replace ? line.replace('export', '// export') : line) + '\n';
    });

    // =========================================================================================
    //
    // =========================================================================================
    let finalAppModule = '';
    const appModule = resolve(srcPath, 'app.module.ts');
    const lineReader2 = readline.createInterface({ input: fs.createReadStream(appModule) });
    lineReader2.on('close', () => fs.writeFile(appModule, finalAppModule, () => null));
    lineReader2.on('line', line => {
      // prettier-ignore
      const replace =
        (auth0      && line.includes('Auth0Module')) ||
        (aws        && line.includes('AWSModule')) ||
        (dynamodb   && line.includes('DynamoDBModule')) ||
        (fbadmin    && line.includes('FirebaseAdminModule')) ||
        (gcloud     && line.includes('GoogleCloudStorageModule')) ||
        (i18next    && line.includes('I18NextModule')) ||
        (ioredis    && line.includes('IORedisModule')) ||
        (keycloak   && line.includes('KeycloakModule')) ||
        (mailer     && line.includes('MailerModule')) ||
        (media      && line.includes('MediaStreamModule')) ||
        (mongoose   && line.includes('MongooseModule')) ||
        (sendbird   && line.includes('SendBirdModule')) ||
        (sequelize  && line.includes('SequelizeModule')) ||
        (social     && line.includes('SocialModule')) ||
        (socket     && line.includes('SocketModule')) ||
        (typeorm    && line.includes('TypeOrmModule')) ||
        (twilio     && line.includes('TwilioModule')) ||
        (wowza      && line.includes('WowzaModule'));

      finalAppModule += replace ? '' : line + '\n';
    });

    return plop.renderString('Everything OK !!!');
  }

  function actions(answer) {
    const actions = [];

    const libs = answer[PROMPT_LIBS];
    const name = answer[PROMPT_PROJECT_NAME];

    actions.push('======================================');
    actions.push(' 1 - Adding Main Libraries ...');
    actions.push('======================================');
    actions.push(...addMainLibraries(libs));

    actions.push('');
    actions.push('======================================');
    actions.push(' 2 - Adding Configuration Folders ...');
    actions.push('======================================');
    actions.push(...addConfigFolders());

    actions.push('');
    actions.push('======================================');
    actions.push(' 3 - Adding Database Folders ...');
    actions.push('======================================');
    actions.push(...addDatabaseFolders(libs));

    actions.push('');
    actions.push('======================================');
    actions.push(' 4 - Adding Configuration Files ...');
    actions.push('======================================');
    actions.push(...addConfigFiles());

    actions.push('');
    actions.push('======================================');
    actions.push(' 5 - Changing Project Name ...');
    actions.push('======================================');
    actions.push(...changeProjectName(name));

    actions.push('');
    actions.push('======================================');
    actions.push(' 6 - Checking Project Dependencies ...');
    actions.push('======================================');
    actions.push(checkingDependencies);

    actions.push('');
    actions.push('======================================');
    actions.push(' 7 - Remove Unused Components ...');
    actions.push('======================================');
    actions.push(removeUnusedComponents);

    return actions;
  }

  plop.setGenerator('init', {
    description: 'initialize your first project',
    prompts: [inputProjectName, selectLibraries, selectSubLibraries, askingForExamples],
    actions
  });
};
