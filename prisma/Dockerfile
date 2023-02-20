FROM node:alpine As dependencies

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn


FROM node:alpine As migration

WORKDIR /usr/src/app

COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
