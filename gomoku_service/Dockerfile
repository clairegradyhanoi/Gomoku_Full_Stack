FROM node:16-alpine

WORKDIR /gomoku_service

ADD ./package.json ./
ADD ./yarn.lock ./
ADD ./tsconfig.json ./
ADD ./.env ./
RUN yarn --ignore-scripts

CMD yarn dev
