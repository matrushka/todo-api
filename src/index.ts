import "reflect-metadata";
import { createConnection } from "typeorm";

import fastify from "fastify";
import UserController from "./controllers/user";

import authenticateAccessToken from "./services/authenticateAccessToken";
import { User } from "./entity/User";
import TaskController from "./controllers/task";

// using declaration merging, add your plugin props to the appropriate fastify interfaces
declare module "fastify" {
  interface FastifyRequest {
    user?: User;
  }
}

const { PORT = 3000 } = process.env;

// TODO: add a proper logging infra
const boot = async () => {
  const server = fastify({ logger: true });

  server.addHook("preHandler", async (req, reply, done) => {
    const accessToken = (req.query as any).accessToken;
    req.user = accessToken ? await authenticateAccessToken(accessToken) : undefined;
    done();
  });

  server.register(UserController, { prefix: "/users" });
  server.register(TaskController, { prefix: "/tasks" });

  await createConnection();
  await server.listen(PORT);
};

boot().catch((e) => {
  console.error(`FAILED TO BOOT: ${e}`);
  process.exit(1);
});

// createConnection()
//   .then(async (connection) => {
//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");
//   })
//   .catch((error) => console.log(error));
