FROM node:alpine As dependencies

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
#  yarn.lock
RUN yarn


FROM node:alpine As build

WORKDIR /usr/src/app

COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN yarn build



FROM node:alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn --only=production

COPY . .

RUN yarn build

CMD [ "node","dist/app/users/main" ]

