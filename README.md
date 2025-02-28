## Description

This set of applications is a test task for communicating with MQTT broker.
In this repository there are two nest.js applications, docker-compose file, mosquitto config

`alarm-aggregator` is where the logic is written and the main functionality implemented
There are services and repositories with related logic also .spec file that covers logic with unit tests

`test-publisher-app` is a simple app for publishing messages to the topic. Mqtt module is also provided as a repository.

`mosquitto/mosquitto.conf` will be added as a volume to the MQTT broker container so this config will be applied

## Running the apps

create .env from .env.example and specify the variables in both project folders
Running `docker-compose.yml` with `docker-compose up` command will start `alarm-aggregator` and `test-publisher-app` as
well as mqtt broker within one network
Each nest.js app image will be built with corresponding docker files.
Module installation will be performed for each project, and live reload on code change will work instantly

## Notice

For local purpose, its better to start with docker-compose up in the root directory and not `npm start` from project directories for MQTT
to be available and configured
