#!/bin/sh

(cd ./packages/server && yarn prisma migrate deploy)
(cd ./packages/server && yarn prisma generate)
