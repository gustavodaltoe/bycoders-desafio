FROM node:16-alpine

RUN apk update \
    && apk add bash

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY packages/web/package.json ./packages/web/
COPY package.json yarn.lock lerna.json ./
COPY ./packages/web ./packages/web

RUN set -x \
    && npx lerna bootstrap --use-workspaces

COPY . .

CMD ["yarn", "web:dev"]
