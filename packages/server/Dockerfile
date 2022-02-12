FROM node:16-alpine

RUN apk update \
    && apk add bash \
    && yarn set version berry

WORKDIR /app

COPY packages/server/package.json ./packages/server/
COPY .yarn ./.yarn
COPY package.json .yarnrc.yml yarn.lock ./

RUN set -x \
    && yarn install

CMD ["yarn", "server:dev"]
