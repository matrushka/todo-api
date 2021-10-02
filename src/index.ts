import "reflect-metadata";
import { createConnection } from "typeorm";
// import { User } from "./entity/User";
import fastify from "fastify";
import UserController from "./controllers/user";

const { PORT = 3000 } = process.env;

// TODO: add a proper logging infra
const boot = async () => {
  const server = fastify({ logger: true });

  server.register(UserController, { prefix: "/users" });

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
