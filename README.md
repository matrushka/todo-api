# TODO API

## Running Dev Env

* Run `yarn install` to add dependencies (you can also use npm if you want).
* Create a `.env` file on the root directory.
* Define the `DATABASE_URL` environment varible in your `.env` file with the right parameters for connecting to your postgres database.
  * Schema: `[database type]://[username]:[password]@[host]:[port]/[database name]`
  * Example: `postgres://foo:foo@heroku.com:5432/hellodb`
* Define the `MASTER_SECRET` environment in your `.env` file with a relatively long string.
* Run `typeorm migration:run` to run database migrations.
* Run `yarn dev` to run the API on port 3000.
* You can use `yarn cli` for creating users and access tokens.

## Running Tests

* Run `yarn install` to add dependencies (you can also use npm if you want).
* Create a `.env` file on the root directory.
* Define the `DATABASE_URL` environment varible in your `.env` file with the right parameters for connecting to your postgres database.
  * Schema: `[database type]://[username]:[password]@[host]:[port]/[database name]`
  * Example: `postgres://foo:foo@heroku.com:5432/hellodb`
* Define the `MASTER_SECRET` environment in your `.env` file with a relatively long string.
* Run `yarn test` to run tests.

## Running Production

* To be written