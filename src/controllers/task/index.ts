import { FastifyPluginCallback } from "fastify";
import listTasks from "../../services/listTasks";

const TaskController: FastifyPluginCallback = (app, opts, done) => {
  app.get("/", async (req, reply) => {
    return listTasks();
  });

  // app.post("/", async (req, reply) => {
  //   if (!req.user) return reply.status(400).send();
  //   return req.user;
  // });

  // app.post("/:id", async (req, reply) => {
  //   if (!req.user) return reply.status(400).send();
  //   return req.user;
  // });

  done();
};

export default TaskController;
