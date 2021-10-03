import { FastifyInstance } from "fastify";
import boot from "../src/api";
import getPort from "get-port";
import connection from "./connection";
import { getConnection } from "typeorm";

let instance: FastifyInstance;
let port: number;

const server = {
  auto() {
    afterAll(async () => {
      await server.close();
    });

    connection.auto();

    beforeAll(async () => {
      await server.create();
    });
  },

  getUrl(pathString = "") {
    if (instance === undefined || port === undefined) throw new Error("Server not started yet.");
    return `http://127.0.0.1:${port}${pathString}`;
  },

  async create() {
    port = await getPort();
    instance = await boot(port, "test", getConnection());
  },

  async close() {
    if (instance) await instance.close();
    instance = undefined;
    port = undefined;
  },
};

export default server;
