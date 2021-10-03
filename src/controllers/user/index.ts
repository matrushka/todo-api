import { FastifyPluginCallback } from "fastify";
import { APIRequest } from "../../types";

const UserController: FastifyPluginCallback = (app, opts, done) => {
  app.get("/me", async (req: APIRequest) => {
    const user = await req.authenticate();
    return { user };
  });
  done();
};

export default UserController;
