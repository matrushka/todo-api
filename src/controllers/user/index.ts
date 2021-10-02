import { FastifyPluginCallback } from "fastify";

const UserController: FastifyPluginCallback = (app, opts, done) => {
  app.get("/me", async (req, reply) => {
    if (!req.user) return reply.status(400).send();
    return req.user;
  });
  done();
};

export default UserController;
