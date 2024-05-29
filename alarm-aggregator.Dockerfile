FROM node:20-alpine

WORKDIR /app

COPY ./alarm-aggregator/package*.json .

RUN npm i

COPY ./alarm-aggregator .

CMD ["npm", "run", "build"]
