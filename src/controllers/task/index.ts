import { FastifyPluginCallback } from "fastify";
import { TaskProps, TaskStatus } from "../../entity/Task";
import createTask from "../../services/createTask";
import deleteTask from "../../services/deleteTask";
import listTasks, { ListTasksQuery } from "../../services/listTasks";
import updateTask from "../../services/updateTask";
import { APIRequest } from "../../types";

const TaskController: FastifyPluginCallback = (app, opts, done) => {
  app.get("/", async (req: APIRequest<{ Querystring: ListTasksQuery }>) => {
    return { tasks: await listTasks(req.query) };
  });

  app.post("/", async (req: APIRequest<{ Body: { task: TaskProps } }>) => {
    await req.authenticate();
    const task = await createTask(req.body.task);
    return { task };
  });

  app.put(
    "/:id",
    async (req: APIRequest<{ Params: { id: string }; Body: { task: Partial<TaskProps> } }>) => {
      await req.authenticate();
      const task = await updateTask(req.params.id, req.body.task);
      return { task };
    }
  );

  app.delete("/:id", async (req: APIRequest<{ Params: { id: string } }>) => {
    await req.authenticate();
    await deleteTask(req.params.id);
    return { ok: true };
  });

  done();
};

export default TaskController;
