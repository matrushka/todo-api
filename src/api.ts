import "reflect-metadata";
import { Connection, createConnection } from "typeorm";

import fastify, { FastifyServerOptions } from "fastify";
import UserController from "./controllers/user";

import authenticateAccessToken from "./services/authenticateAccessToken";
import TaskController from "./controllers/task";
import { APIRequest, TaskStatus } from "./types";
import createError = require("fastify-error");
import { ALL_TASK_STATUSES, DEVELOPMENT_ENV } from "./constants";

const AuthenticationError = createError("UNAUTHENTICATED_REQUEST", "Unauthenticated request", 401);
// TODO: add a proper logging infra
const boot = async (address: string, port: number, env: string, connection?: Connection) => {
  const logger: FastifyServerOptions["logger"] =
    env === "test" ? false : { prettyPrint: env === DEVELOPMENT_ENV };
  const server = fastify({ logger });

  server.decorateRequest("getCurrentUser", async function () {
    const accessToken = this.query.accessToken;
    const user = accessToken ? await authenticateAccessToken(accessToken) : undefined;
    return user;
  });

  server.decorateRequest("authenticate", async function (this: APIRequest) {
    const user = await this.getCurrentUser();
    if (user) return user;
    throw new AuthenticationError();
  });

  server.setErrorHandler((error, request, reply) => {
    if (error.validation) {
      reply.code(400).send({
        message: error.message,
      });
    } else {
      const statusCode = error.statusCode >= 400 ? error.statusCode : 500;
      if (statusCode >= 500) request.log.error(error);

      reply.code(statusCode).send({ message: error.message });
    }
  });

  server.addSchema({
    $id: "User",
    type: "object",
    required: ["id", "email"],
    properties: {
      id: { type: "string" },
      displayName: { type: ["string", "null"] },
      email: { type: "string" },
    },
  });

  server.addSchema({
    $id: "Task",
    type: "object",
    required: ["id", "name", "status"],
    properties: {
      id: { type: "string" },
      name: { type: ["string"] },
      status: {
        type: "string",
        enum: ALL_TASK_STATUSES,
      },
    },
  });

  server.register(UserController, { prefix: "/users" });
  server.register(TaskController, { prefix: "/tasks" });

  if (!connection) await createConnection();
  await server.listen(port, address);
  return server;
};

export default boot;
