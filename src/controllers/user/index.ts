import { FastifyPluginCallback } from "fastify";

const UserController: FastifyPluginCallback = (app, opts, done) => {
  app.get("/me", async (req, reply) => {
    return { hello: "world" };
  });
  done();
};

export default UserController;
