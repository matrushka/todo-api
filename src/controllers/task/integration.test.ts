import server from "../../../test/server";
import createUser from "../../services/createUser";
import generateAccessToken from "../../services/generateAccessToken";
import axios, { AxiosResponse } from "axios";
import createTask from "../../services/createTask";
import { TaskStatus } from "../../types";

server.auto();

const VALID_EMAIL = "test@test.com";

describe("controllers.task", () => {
  let accessToken;
  let existingTasks = [];

  beforeEach(async () => {
    existingTasks = [];
    const user = await createUser({ email: VALID_EMAIL });
    accessToken = generateAccessToken(user);

    for (let i = 0; i < 5; i += 1) {
      let status: TaskStatus = TaskStatus.TO_DO;
      if (i % 2 == 0) status = TaskStatus.IN_PROGRESS;
      if (i % 3 == 0) status = TaskStatus.COMPLETED;
      existingTasks.push(await createTask({ name: `Task #${i}`, status }));
    }
  });

  describe("GET /", () => {
    type Resp = {
      tasks: { name: string; id: string; status: TaskStatus }[];
    };

    it("should return all tasks w/o a status filter", async () => {
      const resp = await axios.get<Resp>(server.getUrl("/tasks"), { params: { accessToken } });

      expect(resp.status).toBe(200);
      expect(resp.data.tasks).toHaveLength(5);
      expect(resp.data.tasks.map((task) => task.name)).toMatchSnapshot();
      expect(resp.data.tasks.map((task) => task.status)).toMatchSnapshot();
    });

    it("should return filtered tasks when status query param is provided", async () => {
      const todoResp = await axios.get<Resp>(server.getUrl("/tasks"), {
        params: { status: TaskStatus.TO_DO },
      });
      expect(todoResp.data.tasks).toHaveLength(1);

      const inProgressResp = await axios.get<Resp>(server.getUrl("/tasks"), {
        params: { status: TaskStatus.IN_PROGRESS },
      });
      expect(inProgressResp.data.tasks).toHaveLength(2);

      const completedResp = await axios.get<Resp>(server.getUrl("/tasks"), {
        params: { status: TaskStatus.COMPLETED },
      });
      expect(completedResp.data.tasks).toHaveLength(2);
    });
  });

  describe("POST /", () => {
    type Resp = {
      task: { name: string; id: string; status: TaskStatus };
    };

    it("should create a new task", async () => {
      const resp = await axios.post<any, AxiosResponse<Resp>>(
        server.getUrl(`/tasks`),
        {
          task: {
            name: "New Task",
            status: TaskStatus.COMPLETED,
          },
        },
        { params: { accessToken } }
      );

      expect(resp.data.task).toBeDefined();
    });

    it.todo("should fail when accessToken is missing");
    it.todo("should fail when an invalid status is passed");
    it.todo("should fail when an empty name is passed");
  });

  describe("PUT /:id", () => {
    type Resp = {
      task: { name: string; id: string; status: TaskStatus };
    };

    it("should edit the task", async () => {
      const initialTask = existingTasks[0];
      const resp = await axios.put<any, AxiosResponse<Resp>>(
        server.getUrl(`/tasks/${initialTask.id}`),
        {
          task: {
            name: "EDITED TASK",
            status: TaskStatus.TO_DO,
          },
        },
        { params: { accessToken } }
      );

      expect(resp.data.task).toBeDefined();
      expect(resp.data.task.id).toBe(initialTask.id);
      expect(resp.data.task.name).not.toBe(initialTask.name);
      expect(resp.data.task.status).not.toBe(initialTask.status);
    });

    it.todo("should fail when accessToken is missing");
  });

  describe("DELETE /:id", () => {
    type Resp = {
      ok: true;
    };

    it.todo("should fail when accessToken is missing");
    it("should delete the task", async () => {
      const initialTask = existingTasks[0];
      const resp = await axios.delete<any, AxiosResponse<Resp>>(
        server.getUrl(`/tasks/${initialTask.id}`),
        { params: { accessToken } }
      );

      expect(resp.data.ok).toBe(true);
    });
  });
});
