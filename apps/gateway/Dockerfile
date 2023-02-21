##############################
# BUILD FOR LOCAL DEVELOPMENT
##############################

FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN npx prisma generate


#######################
# BUILD FOR PRODUCTION
#######################

FROM node:alpine As build

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

COPY --from=development /usr/src/app/node_modules ./node_modules

COPY . .

RUN yarn build

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN yarn install --immutable --immutable-cache --check-cache --prod

#############
# PRODUCTION
#############

FROM node:alpine As production

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

CMD [ "node","dist/apps/gateway/main" ]

