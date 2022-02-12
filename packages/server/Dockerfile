FROM node:16-alpine

RUN apk update \
    && apk add bash

WORKDIR /app

COPY packages/server/package.json ./packages/server/
COPY package.json yarn.lock lerna.json ./

RUN set -x \
    && yarn install

COPY ./packages/server .

CMD ["yarn", "server:dev"]
