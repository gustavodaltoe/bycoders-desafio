FROM node:16-alpine

RUN apk update \
    && apk add bash

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY packages/web/package.json ./packages/web/
COPY package.json yarn.lock lerna.json ./

RUN set -x \
    && yarn install

COPY ./packages/web .

CMD ["yarn", "web:dev"]
