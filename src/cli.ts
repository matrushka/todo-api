import "reflect-metadata";
import { createConnection } from "typeorm";
import { Command } from "commander";
import createUser from "./services/createUser";
import findUserByEmail from "./services/findUserByEmail";
import generateAccessToken from "./services/generateAccessToken";

const program = new Command();
program.version("0.0.1");

program
  .command("create-user [email] [displayName]")
  .description("Create a new user")
  .action(async (email, displayName) => {
    const user = await createUser({ email, displayName });
    console.log(`User created for: ${user.email}`);
  });

program
  .command("generate-access-token [email]")
  .description("Generate an access token for a user")
  .action(async (email) => {
    const user = await findUserByEmail(email);
    console.log(generateAccessToken(user));
  });

const boot = async () => {
  const connection = await createConnection();
  await program.parseAsync(process.argv);
  connection.close();
};

boot();
