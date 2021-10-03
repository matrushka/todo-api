import { FastifyPluginCallback } from "fastify";
import { APIRequest } from "../../types";

const UserController: FastifyPluginCallback = (app, opts, done) => {
  app.get(
    "/me",
    {
      schema: {
        response: {
          200: {
            type: "object",
            properties: {
              user: { $ref: "User" },
            },
          },
        },
      },
    },
    async (req: APIRequest) => {
      const user = await req.authenticate();
      return { user };
    }
  );

  done();
};

export default UserController;
