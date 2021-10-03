import boot from "./api";
import { DEFAULT_PORT, DEVELOPMENT_ENV } from "./constants";

const { PORT = DEFAULT_PORT, NODE_ENV = DEVELOPMENT_ENV, BIND_ADDRESS = "127.0.0.1" } = process.env;

boot(BIND_ADDRESS, Number(PORT), NODE_ENV).catch((e) => {
  console.error(`FAILED TO BOOT: ${e}`);
  process.exit(1);
});
