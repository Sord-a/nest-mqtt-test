## Description
This project is for simplifying the calls to mqtt broker.
Http calls to /mqtt endpoint will publish messages to specified topic

## Notice
For local purpose its better to start it with docker-compose.yml, for mqtt to be available and configured

## Installation
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```