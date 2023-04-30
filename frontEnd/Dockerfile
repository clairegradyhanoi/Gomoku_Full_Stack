FROM node:16-alpine

WORKDIR /gomoku_react

ADD ./package.json ./
ADD ./yarn.lock ./
ADD ./tsconfig.json ./
RUN yarn

CMD yarn start