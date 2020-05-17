# Migration Guide

## Migrate from TSLint to ESLint

### ESLint: Setup

- Run `yarn add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-import`
- Copy `.eslintrc.js` file from core project
- Add the follow snippet into your `package.json`

```json
{
  "scripts": {
    "format": "prettier \"**/*.ts\" --write && git status",
    "lint": "eslint \"src/**/*.ts\" --fix --ignore-pattern \"**/*.spec.ts\""
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -c .commitlintrc.json -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.ts": ["eslint --fix"],
    "*.{ts,json}": ["prettier --write"]
  }
}
```

### TSLint: Removal

- Run `yarn remove tslint tslint-config-prettier`
- Remove the `tslint.json` file.
- Update `vscode/extensions.json` to recommend the ESLint extension and not TSLint anymore

```diff
"recommendations": [
- "ms-vscode.vscode-typescript-tslint-plugin",
+ "dbaeumer.vscode-eslint",
]
```

## Add Pre-commit Hook

- run `yarn add -D @commitlint/config-conventional @commitlint/cli @commitlint/config-angular husky lint-staged prettier`
- copy `.commitlintrc.json` from core project
- copy and replace `.prettierrc` from core project
- add the follow snippet into your `package.json`

```json
{
  "scripts": {
    "format": "prettier \"**/*.ts\" --write && git status"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -c .commitlintrc.json -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,json}": ["prettier --write"]
  }
}
```

### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feature**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

### Scope

The scope should be the name of the npm package affected (as perceived by person reading changelog generated from commit messages.

The following is the list of supported scopes:

- **api**
- **api/{module}**
- **common**
- **libs**
- **models**

### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

> Example:
>
> - fix(api/user): update query user list
> - feat(api): implement authentication
> - refactor(models): update transaction find by user function

## Migrate to Nest V7

- remove `rimraf` dependency and using `deleteOutDir` option in `nest-cli.json` instead
- remove `prebuild` script in package.json
- add `watchAssets` option in `nest-cli.json`

```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "assets": ["**/*.sql"],
    "deleteOutDir": true,
    "watchAssets": true,
    "webpack": false
  }
}
```

- update `AppExceptionFilter` in `app-exception-filter.ts` (less code & [better error schema](https://docs.nestjs.com/migration-guide#validation-errors-schema))
- update `createParamDecorator` from the [official doc](https://docs.nestjs.com/migration-guide#custom-route-decorators)
  - `api-headers.decorator.ts`
  - `auth-user.decorator.ts`
  - `auth0.decorator.ts`
  - `i18next.decorator.ts`

## Migrate to @nest/cli

- run `yarn add @nestjs/cli --dev`
- run `yarn remove module-alias fork-ts-checker-webpack-plugin nodemon ts-node webpack webpack-cli webpack-node-externals`
- run `yarn remove cpx` if you have
- remove `_moduleAliases` in `package.json`

```json
{
  "_moduleAliases": {
    "@api": "dist/api",
    "@common": "dist/common",
    "@entities": "dist/entities",
    "@lib": "dist/lib",
    "@models": "dist/models",
    "@queries": "dist/queries",
    "@repositories": "dist/repositories",
    "@schema": "dist/schema"
  }
}
```

- delete script in `package.json`

  - `log`
  - `dev`
  - `webpack:node`
  - `webpack`
  - `build`
  - `prestart`
  - `start`

- and replace with script

```json
{
  "scripts": {
    "dev": "nest start --watch",
    "prebuild": "rimraf dist",
    "build": "nest build --tsc",
    "prestart": "yarn run build",
    "start": "cross-env NODE_ENV=production pm2 start process.json"
  }
}
```

- Step 2: Update some project files

  - Rename `src/index.ts` to `src/main.ts`
  - Delete `nodemon.json`
  - Add `tsconfig.build.json` from core project
  - Add `nest-cli.json` from core project
  - Replace `webpack.config.js` from core project
  - Replace `process.json` from core project

## Commands

```bash
yarn dev  # run development mode
yarn build # run build process
yarn start # run build process and start application wth pm2
```

By default `yarn dev` use typescript, to use webpack in development go to `nest-cli.json` and change `webpack` from `false` to `true`.
It also comes with distribute file utils when we build the project like copy sql files

> For more info: https://docs.nestjs.com/cli/overview

```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "assets": ["**/*.sql"],
    "webpack": true
  }
}
```
