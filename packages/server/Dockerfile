FROM node:16-alpine

RUN apk update \
    && apk add bash \
    && yarn set version berry

WORKDIR /app

COPY .yarn ./.yarn
COPY package.json packages/server/package.json \
    .yarnrc.yml yarn.lock ./

RUN set -x \
    && yarn install

COPY . .

CMD ["yarn", "server:dev"]
