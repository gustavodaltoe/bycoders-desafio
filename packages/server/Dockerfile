FROM node:16-alpine

RUN echo -e "http://nl.alpinelinux.org/alpine/v3.5/main\nhttp://nl.alpinelinux.org/alpine/v3.5/community" > /etc/apk/repositories
RUN apk update \
    && apk add bash

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /app

COPY packages/server/package.json ./packages/server/
COPY package.json yarn.lock lerna.json ./
COPY ./packages/server .
COPY ./packages/server/scripts .

RUN set -x \
    && chmod +x ./scripts/server.sh \
    && yarn install --production=false

COPY . .

ENTRYPOINT ["dockerize", "-wait", "tcp://postgres:5432", "-timeout", "20s", "./packages/server/scripts/server.sh"]

CMD ["yarn", "server:dev"]
