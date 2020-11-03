# CHANGELOG

## 0.9.3

_*Nov 03, 2020*_

- 📐 update dependencies on `package.json`
- 📐 update `.vscode` extensions
- 📐 fix some coding

## 0.9.2

_*Jul 27, 2020*_

- 📦 add `KeycloakModule` module with `passport-jwt` & `keycloak-admin`

## 0.9.1

_*Apr 09, 2020*_

- 🔥 replace `excel4node` with `exceljs`
- 🔥 enhance styling in excel class
- 🔥 add `readFile` and `readStream` in excel class
- ❌ remove `excel4node.d.ts` file
- 📐 update api-header decorator
- 📐 update `eslintrc.js` to bypass eslint validation
- 📐 update `tsconfig.json` to bypass eslint validation

## 0.9.0

_*Apr 05, 2020*_

- 💡 read more on [Migrate from TSLint to ESLint](https://lab.pathmazing.com/Pathmazing/backend-api-nestjs-sample/blob/master/MIGRATION.md)
- 🔥 migrate from `TSLint` to `ESLint`
- 🔥 update `lint-staged` to run `eslint`
- 📐 fix all files that have wrong `eslint` format

## 0.8.4

_*Apr 04, 2020*_

- 📦 add `IsArrayType` in `dto.decorator.ts`
- 📐 merge `GoogleCloudStorageConfig` into one provider
- 📐 move sequelize helper into `@lib/sequelize`
- 📐 fix validate rules on commit message

## 0.8.3

_*March 31, 2020*_

- 🔥 add `UploadModule` with `google-cloud-storage` helper
- 🔥 add `Upload API Helper` when generate new project
- 📐 update `google-cloud-storage` lib
- 📐 refactor code in `common`

## 0.8.2

_*March 31, 2020*_

- 🔥 update `commitlint`, `husky`, to validate commit name
- 🔥 update `lint-staged`, `prettier` to format code before commit
- 📦 add script `format` to run format code of all files in project
- 📦 support node >=10.13.0 up and drop all previous node support
- 📐 fix all files that are not format yet

## 0.8.1

_*March 27, 2020*_

- 🔥 update `ValidationPipe` with option `errorHttpStatusCode`
- 🔥 update `dto.decorator.ts` for easy reading
- 📦 add `RedisIoAdapter` for socket
- 📐 update dependencies on `package.json`
- 📐 fix `i18next` lib when import
- 📐 fix disable global timestamps in `sequelize` lib
- ❌delete file `sequelize.interface.ts`

## 0.8.0

_*March 17, 2020*_

- 💡 read more on [Migration Guide](https://lab.pathmazing.com/Pathmazing/backend-api-nestjs-sample/blob/master/MIGRATION.md)
- 📐 update dependencies on `package.json`
- 📐 update `createParamDecorator` in decorator files
- 📐 update `AppExceptionFilter` class (less code)
- 📐 update default option in `nest-cli.json`

## 0.7.6

_*March 13, 2020*_

- 📦 add example for typeorm
- 📐 fix validation jwt in auth guard
- 📐 fix typo in sendbird lib
- 📐 fix export typeorm module
- 📐 fix tslint extension in `.vscode`

## 0.7.5

_*February 04, 2020*_

- 🔥add Hanuman font instead
- 📐update font in pdfmake.class
- 📐fix minor change in twilio
- ❌delete Battambang / Siemreap / Moul font

## 0.7.4

_*January 29, 2020*_

- ❌ remove `cron` lib and replace with `@nestjs/schedule`

## 0.7.3

_*January 27, 2020*_

- 🔥 add wowza lib
- 🔥 add twilio lib
- 📐 update all token constants in all lib

## 0.7.2

_*January 27, 2020*_

- 🔥 add SendBird lib (that's a lot of code 🤦‍♂️🤦‍♂️🤦‍♂️)

## 0.7.1

_*January 23, 2020*_

- 🔥 add dynamodb module helper

## 0.7.0

_*January 20, 2020*_

- 💡 read more on [Migration Guide](https://lab.pathmazing.com/Pathmazing/backend-api-nestjs-sample/blob/master/MIGRATION.md)
- 🔥 refactoring project builder
- 📦 add `keepConnectionAlive` in typeorm module when using webpack compiler
- 🖊️ renamed entry file from `src/index.ts` to `src/main.ts`
- ❌ remove `nodemon.json`
- ❌ remove unused dependencies and module

## 0.6.0

_*January 17, 2020*_

- 📦 add `moment` & `timeAgo` utils
- 📐 update dependencies on `package.json`
- 📐 update `i18next` providers
- ❌ remove `typegoose` lib and replace with `@typegoose/typegoose`

## 0.5.2

_*December 08, 2019*_

- 💡 enhanced `config` lib with better error messages
- 🔥 add DTO decorators
- 🔥 add custom injectable service in `sequelize` models
- 📦 add `@nestjs/jwt` module
- 📦 add `C` _(constants)_ & `U` _(utils)_ in `@common`
- 📦 add `IsGreaterOrEqual` validator
- 📐 update `@nestjs/swagger` module with breaking changes
- 📐 update on handle authenticate connection in socket
- 📐 update dependencies on `package.json`
- 🖊️ rename decorator from `ApiHeader` to `ApiCustomHeader`
- ❌ remove `ArrayMongoId`, `ApiDateModelProperty`, `ApiEnumModelProperty` decorators
- ❌ remove `jsonwebtoken` dependency

## 0.5.1

_*September 18, 2019*_

- 📦 add `google-api` guard
- 📦 add `plain` option on `RunQuery` in `sequelize.helper`
- 📦 add new sequelize examples
- 📐 update `sequelize` and `sequelize-typescript` dependencies
- 🦖 Docusaurus
  - add auth0 section
  - update Docusaurus dependency

## 0.5.0

_*September 02, 2019*_

- 📦 add `auth0` module and guard
- 📦 update dependencies on `package.json`
- 📐 update plopfile with `auth0`
- 📐 update .env.example
- 🐛 fix `DayoffCalculation` helper class
- 🐛 fix some i18next functions
- 🐛 fix node-media-server typings

## 0.4.8

_*July 26, 2019*_

- 📦 add swagger customization helper
- 📦 add i18next converter for type-safe
- 🐛 fix `DayoffCalculation` helper class
- 🐛 fix redis listener event

## 0.4.7

_*July 18, 2019*_

- 📦 add `DayoffCalculation` helper class
- 📐 update logic on Sanitize Html
- 📐 update plopfile
- 🐛 fix error vscode-icon extension
- 🦖 Docusaurus
  - update Nginx configuration content
  - update contents on dev tool and cheat sheets page

## 0.4.6

_*June 03, 2019*_

- 🦖 Docusaurus
  - add SSL Certificate with IIS
  - reorganize documentations

## 0.4.5

_*May 24, 2019*_

- 💄 breaking changes on `app-exception-filter.ts`
  - add support for apollo
  - changes response on class-validator (DTO) or status code 422
- 🐛 fix and update sequelize providers and models
- 📦 update dependencies on `package.json`

## 0.4.4

_*Apr 22, 2019*_

- 🐛 fix validator bug on App Exception Filter
- 📐 update i8next module to support `lookupHeader` [(#179)](https://github.com/i18next/i18next-express-middleware/issues/179)
- 📦 update dependencies on `package.json`

## 0.4.3

_*Apr 18, 2019*_

- 🔥 improve HMR performance

## 0.4.2

_*Apr 12, 2019*_

- add i18next module and example
- fix slow performance on ts-node
- fix generate core project on socket.io

## 0.4.1

_*Apr 10, 2019*_

- update nestjs to v6.1.0
- update nestjs websocket
- update @google-cloud/storage

## 0.4.0

_*Apr 10, 2019*_

- update nestjs core v5 to v6
- update dependencies in package.json
- remove @lib/s3 and @lib/redis

## 0.3.1

_*Apr 10, 2019*_

- fix Sequelize helper
- 🦖 Docusaurus
  - fix typo on install-mysql.md
  - add more info on nginx-configuration.md

## 0.3.0

_*Mar 15, 2019*_

- 😍 add plopfile.js used to generate core project
- 📦 remove sample module and replace by example module
- 💡 refactored some of the code base

## 0.2.6

_*Mar 12, 2019*_

- add TypeOrm in core
- add TypeOrm example module

## 0.2.5

_*Feb 28, 2019*_

- add httpsOptions for localhost
- 🦖 Docusaurus
  - add Create Localhost Certificate
  - disable search textbox
  - fix documents typo

## 0.2.4

_*Feb 25, 2019*_

- tweak some configuration on nest core
- 🦖 Docusaurus
  - add Nginx server guide
  - add collapse side menu
  - enabled search textbox
  - update version to 1.7.2

## 0.2.3

_*Feb 14, 2019*_

- 🦖 add Docusaurus into the project
- relocated the documents pages

## 0.2.2

_*Feb 13, 2019*_

- add additional function on pdfmake.class
- add resolve point on install-mysql.md
- update pdfmake examples route

## 0.2.1

_*Feb 08, 2019*_

- add new iqps sample document for pdfmake
- add new khmer fonts
- fix excel4node.d.ts typings
- refactor pdfmake.d.ts typings
- update pdfmake.class

## 0.2.0

_*Feb 05, 2019*_

- add CHANGELOG.md
- add decimalNumbers to sequelize to converting string to number
- add pdfmake.class / pdfmake typings / fonts
- fix excel example
- refactor crypto service
- update install-mongo.md

## 0.1.9

_*Jan 08, 2019*_

- add "export as excel" document
- add .vscode/extensions and its usage document
- add DB_SYNC for @lib/sequelize
- add example module for back-end tips
- add install-mysql.md
- add sequelize helpers for add/update locales
- fix typo on install-mongodb / install-redis
- update .env.example
- update @models
- update api-header-decorator
- update document
- update exception filter on nest version above 5.3
- update guide.md
- update type on config.service.ts
- update type on excel4node.d.ts

## 0.1.8

_*Dec 26, 2018*_

- add install-redis.md
- add new issue template
- add project sample README
- fix install-mongo.md
- fix install-redis.md
- fix pagination class that cause query issue with mongodb
- update README.md
- update cheatsheets.md
- update dependencies

## 0.1.7

_*Dec 05, 2018*_

- add config env validate when app start
- add create page sample
- add number transformer
- add remove file in cron resolver
- add sanitize html transformer
- fix env config in src/index.ts
- fix sequelize helpers
- fix wrong declare variable in cron.resolver
- made types declaration a little bit easy
- update dependencies
- update ioredis

## 0.1.6

_*Nov 01, 2018*_

- add @types/ioredis
- add cheatsheets.md, install-mongodb.md, ioredis.md
- add createMd5Hex to crypto module
- add rate-limit.guard activity diagram
- moved document files
- update error messages when login
- update excel class to support multi sheet
- update guide.md
- update install mongodb.md
- update ioredis to support reminder service

## 0.1.5

_*Oct 16, 2018*_

- add Rate Limiting Guard / UML
- add devtool in webpack config
- add ioredis module
- add new articles / new extensions in guide.md
- downgraded google cloud storage
- remove auth socket middleware
- renamed interceptors to upper camel case
- update dependencies
- update docs directory
- update google cloud doc
- update guide.md

## 0.1.4

_*Oct 11, 2018*_

- add authorize / authenticate / api header decorator
- add authorize / authenticate guard
- add socket join in auth guard
- add authorize api route
- add crypto / media stream module
- fix firebase initialize app when using HMR
- update dependencies
- update prettier config
- update sequelize helpers
- update socket module

## 0.1.3

_*Sep 19, 2018*_

- add aws module
- add sample usage of aws module
- update guide.md

## 0.1.2

_*Sep 11, 2018*_

- 💄 add guide.md (alpha)
- add alias path
- add audit schema
- add auditing interceptor
- add cron ref website
- add helmet / compression
- add sequelize helper
- add soap api sample
- update dependencies

## 0.1.1

_*Aug 30, 2018*_

- add array mongo validator
- add new excel document class
- add soap module
- add social module
- update excel4node typings
- update s3 module / docs

## 0.1.0

_*Jun 11, 2018*_

- 🚀 init core
