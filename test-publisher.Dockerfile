FROM node:20-alpine

WORKDIR /app

COPY ./test-publisher-app/package*.json .

RUN npm i

COPY ./test-publisher-app .

CMD ["npm", "run", "build"]
