FROM node:16-alpine

RUN apk update \
    && apk add bash

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY .yarn ./.yarn
COPY package.json packages/web/package.json \
    .yarnrc.yml yarn.lock ./

RUN set -x \
    && yarn install

COPY . .

CMD ["yarn", "web:dev"]
