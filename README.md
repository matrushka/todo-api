# TODO API

## Instructions

### Running Dev Env

* Run `yarn install` to add dependencies (you can also use npm if you want).
* Create a `.env` file on the root directory.
* Define the `DATABASE_URL` environment varible in your `.env` file with the right parameters for connecting to your postgres database.
  * Schema: `[database type]://[username]:[password]@[host]:[port]/[database name]`
  * Example: `postgres://foo:foo@heroku.com:5432/hellodb`
* Define the `MASTER_SECRET` environment in your `.env` file with a relatively long string.
* Run `yarn migrate` to run database migrations.
* Run `yarn dev` to run the API on port 3000. The API will auto restart with each code change.
* You can use `yarn cli` for creating users and access tokens.

### Running Tests

* Run `yarn install` to add dependencies (you can also use npm if you want).
* Create a `.env` file on the root directory.
* Define the `DATABASE_URL` environment varible in your `.env` file with the right parameters for connecting to your postgres database.
  * Schema: `[database type]://[username]:[password]@[host]:[port]/[database name]`
  * Example: `postgres://foo:foo@heroku.com:5432/hellodb`
* Define the `MASTER_SECRET` environment in your `.env` file with a relatively long string.
* Run `yarn test` to run tests.

### Running Production

* You can run it by using docker.
* Make sure the following environment variables are defined correctly
  * `BIND_ADDRESS`: HTTP server binds to 127.0.0.1 by default to avoid exposing the api to unwanted networks
  * `DATABASE_URL`: Connection string for your database
  * `DATABASE_SSL`: Make sure you set it to `true` if your database requires a SSL connection (ex: Heroku)
  * `MASTER_SECRET`: Will be used for generating and validating access tokens
  * `NODE_ENV`: Setting it to `production` will disable unnecesarry bells and whistles and provide a clear JSON log.
* If you want to run tests in the docker container (CI/CD purposes) you need to use `TEST_DATABASE_URL` environment variable instead of `DATABASE_URL`
* Don't forget to run `yarn migrate` to run database migrations after initial deploy (and also schema changes).
* Alternatively you can also run `docker-compose --build up` to run it with docker compose. Then you'll need to run the commands via `docker execute` or `docker run`.

## How To Create Users And Generate Access Tokens

* App comes with a light CLI that allows you to create users by email and generate access tokens (expires in 7 days).
* `yarn cli generate-user [email]` will generate a user for the provided email.
* `yarn cli generate-access-token [email]` will generate an access token for the user with the provided email.
* Generated access token can be passed with `accessToken` query parameter for authenticating as a user.

## Further Things To Consider

* Schema management can be done better. 
  * Entity schemas defined in entity files
  * Considering easier (with [fluent-json-schema](https://github.com/fastify/fluent-json-schema)) or automated schemas.
  * Typeorm's and Fastify's validation approaches have an overlap. Maybe can be streamlined.
* Auto generated documentation.
  * Adding swagger docs would be nice.
* A CI/CD flow with coverage thresholds
