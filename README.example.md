<img src="https://www.pngitem.com/pimgs/m/195-1951323_your-logo-here-png-company-logo-your-logo.png" alt="logo" align="right" width="300" />

# Photo Enhancement API

> _Photo Enhancement API is a project manages photo and replace a new photo background._

Image will come from client (HomeNet & Dealer Solution):

Manager divided photos to supervisors then supervisors divided to Photo Editor to edit those images. Then, Supervisor will check every enhanced images. The edited images will go to Client QA Website for double check if edited image passes quality check by client QA; otherwise, the edited images will go back to photo editor. If images does not pass quality check by client QA, images will be back to supervisor. If pass, image will be sent to client.

## Developing

### Prerequisites

- [Node](https://nodejs.org/en/download/) a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Yarn](https://yarnpkg.com/lang/en/docs/install/) fast, reliable, and secure dependency management.
- [Visual Studio Code](https://code.visualstudio.com/) a code editor redefined and optimized for building and debugging modern web and cloud applications
- [Postman](https://www.getpostman.com/) the only complete API development environment, for API developers
- [Robo 3T](https://robomongo.org) a shell-centric cross-platform MongoDB management tool
- [FileZilla](https://filezilla-project.org/) the free FTP solution for both client and server
- [CloudBerry Explorer](https://www.cloudberrylab.com/explorer.aspx) for Amazon S3 provides a user interface to Amazon S3 accounts

### Setting up Dev

Clone the project and install application dependencies.

```sh
git clone https://github.com/your/your-project.git
cd your-project/
yarn
```

### Building

Run application in development mode.

```sh
# Nodemon
yarn dev
```

```sh
# Hot Reload Module
yarn webpack      # 1st terminal
yarn webpack:node # 2nd terminal
```

### Deploying / Publishing

Running application on production mode divided into **local** server and **cloud** server. For any env variables changes, check `process.json` and `process-prod.json`.

- Cloud server used for client to check and rejected any photos that enhanced incorrectly.
- Local server primarily used for the internal process of enhancing photos. Most of the cron jobs will be in Local server.

```sh
yarn start        # Local Server
yarn start:prod   # Cloud Server
```

## Versioning

Not available yet.

## Configuration

> To set your application environment variables create a `.env` file.
> There is an `.env.example` file to follow.

```sh
# Application (development, production)
NODE_ENV=
PORT=
JWT_SECRET=

# Mongo Database Credential
MONGO_URI=

# FTP
FTP_HOST=""
FTP_USER=""
FTP_PASSWORD=""
FTP_DESTINATION=""
FTP_URL=""
```

## Tests

Not available yet.

## Style Guide

Our coding style and format are based on 3 components:

- [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint) style linter for typescript along with its rules `tslint.json`
- [TypeScript Hero](https://marketplace.visualstudio.com/items?itemName=rbbit.typescript-hero) organize your imports. Ctrl + Shift + O
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) format your code. Alt + Shift + F

**Important:** When you save your file you **MUST** organize and format your code.

## API Reference

We are using built in NestJS Swagger. The API Documents will be at [http://localhost:3000/docs](http://localhost:3000/docs) when you start your server. The API Documents is not available when the application is lived.

## Database

Using MongoDB 3.6. Instruction on installing is [here](./docs/install-mongodb.md). To see database schema, please check the Diagram point below.

## Diagrams

To see sytem database schema or any diagram, please use [PlantUML](http://plantuml.com). If you are using [VSCode](https://code.visualstudio.com/), please install the extension [PlantUML](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)

- [System Class Diagram](./docs/diagrams/system.class-diagram.puml)
- [System Component Diagram](./docs/diagrams/system.class-diagram.puml)
- [System Use Case Diagram](./docs/diagrams/system.class-diagram.puml)
