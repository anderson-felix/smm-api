FROM node:lts

WORKDIR /home/app

RUN apt-get update

CMD yarn ts-node-dev -r tsconfig-paths/register --inspect --transpile-only --ignore-watch node_modules src/shared/infra/http/server.ts
