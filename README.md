## Description

This set of applications is a test task for communicating with mqtt broker.
In this repository there two nest.js applications, docker-compose file, mosquitto config

`alarm-aggregator` is where the logic written and the main functionality implemented
There are services and repositories with related logic also .spec file that covers logic with unit tests

`test-publisher-app` is simple app for publishing messages to the topic. Mqtt module there also provided as repository.

`mosquitto/mosquitto.conf` will be added as a volume to the mqqt broker container so this config will be applied

## Running the apps

create .env from .env.example and specify the variables in both project folders
Running `docker-compose.yml` with `docker-compose up` command will start `alarm-aggregator` and `test-publisher-app` as
well as mqtt broker within one network
Each nest.js app image will be build with corresponding docker files.
Module installation will be performed for each project, live reload on code change will be working instantly

## Notice

For local purpose its better to start with docker-compose up in root directory and not `npm start` from project directories, for mqtt
to be available and configured
