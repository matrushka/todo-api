import listTasks from ".";
import connection from "../../../test/connection";
import { TaskStatus } from "../../entity/Task";
import createTask from "../createTask";

connection.auto();

describe("services.listTasks", () => {
  beforeEach(async () => {
    await createTask({ name: "to do" });
    await createTask({ name: "in progress", status: TaskStatus.IN_PROGRESS });
    await createTask({ name: "completed", status: TaskStatus.COMPLETED });
  });

  it("should list all tasks", async () => {
    expect(await listTasks()).toHaveLength(3);
  });

  it("should filter by status", async () => {
    expect(await listTasks({ status: TaskStatus.TO_DO })).toHaveLength(1);
    expect(await listTasks({ status: TaskStatus.IN_PROGRESS })).toHaveLength(1);
    expect(await listTasks({ status: TaskStatus.COMPLETED })).toHaveLength(1);
  });
});
