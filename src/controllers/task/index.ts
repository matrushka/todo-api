import { FastifyPluginCallback } from "fastify";
import { ALL_TASK_STATUSES } from "../../constants";
import { TaskProps } from "../../entity/Task";
import createTask from "../../services/createTask";
import deleteTask from "../../services/deleteTask";
import listTasks, { ListTasksQuery } from "../../services/listTasks";
import updateTask from "../../services/updateTask";
import { APIRequest } from "../../types";

const TaskController: FastifyPluginCallback = (app, opts, done) => {
  app.get(
    "/",
    {
      schema: {
        response: {
          200: {
            type: "object",
            properties: {
              tasks: {
                type: "array",
                utems: { $ref: "Task" },
              },
            },
          },
        },
      },
    },
    async (req: APIRequest<{ Querystring: ListTasksQuery }>) => {
      return { tasks: await listTasks(req.query) };
    }
  );

  app.post(
    "/",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            task: {
              required: ["name"],
              type: "object",
              properties: {
                name: { type: "string" },
                status: { type: "string", enum: ALL_TASK_STATUSES },
              },
            },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              task: { $ref: "Task" },
            },
          },
        },
      },
    },
    async (req: APIRequest<{ Body: { task: TaskProps } }>) => {
      await req.authenticate();
      const task = await createTask(req.body.task);
      return { task };
    }
  );

  app.put(
    "/:id",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            task: {
              type: "object",
              properties: {
                name: { type: "string" },
                status: { type: "string", enum: ALL_TASK_STATUSES },
              },
            },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              task: { $ref: "Task" },
            },
          },
        },
      },
    },
    async (req: APIRequest<{ Params: { id: string }; Body: { task: Partial<TaskProps> } }>) => {
      await req.authenticate();
      const task = await updateTask(req.params.id, req.body.task);
      return { task };
    }
  );

  app.delete(
    "/:id",
    {
      schema: {
        response: {
          200: {
            type: "object",
            properties: {
              ok: { type: "boolean" },
            },
          },
        },
      },
    },
    async (req: APIRequest<{ Params: { id: string } }>) => {
      await req.authenticate();
      await deleteTask(req.params.id);
      return { ok: true };
    }
  );

  done();
};

export default TaskController;
