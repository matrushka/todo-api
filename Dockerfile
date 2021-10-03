FROM node:16-alpine AS builder
RUN apk --no-cache add build-base postgresql-dev

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile

FROM node:16-alpine AS app
RUN adduser -D app
USER app
WORKDIR /usr/src/app

COPY . ./
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules

EXPOSE 3000
CMD ["yarn", "start"]
