import updateTask from ".";
import connection from "../../../test/connection";
import { TaskStatus } from "../../entity/Task";
import createTask from "../createTask";
import listTasks from "../listTasks";

connection.auto();

const UUID = "0fc2cb51-2c31-43fc-8858-d1504293d147";

describe("services.updateTask", () => {
  it("should delete an existing task", async () => {
    const task = await createTask({ name: "test" });
    expect(task.status).toBe(TaskStatus.TO_DO);

    const updatedTask = await updateTask(task.id, {
      name: "completed task",
      status: TaskStatus.COMPLETED,
    });
    expect(updatedTask.status).toBe(TaskStatus.COMPLETED);
    expect(updatedTask.name).toBe("completed task");
  });

  it("should fail updating a non-existing task", async () => {
    await expect(updateTask(UUID, { name: "fail" })).rejects.toThrowError("Could not find");
  });
});
