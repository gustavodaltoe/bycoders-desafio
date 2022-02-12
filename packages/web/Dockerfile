FROM node:16-alpine

RUN apk update \
    && apk add bash \
    && yarn set version berry

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY .yarn ./.yarn
COPY packages/web/package.json ./packages/web/
COPY package.json .yarnrc.yml yarn.lock ./

RUN set -x \
    && yarn install

COPY . .

CMD ["yarn", "web:dev"]
