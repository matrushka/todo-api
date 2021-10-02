import deleteTask from ".";
import connection from "../../../test/connection";
import { TaskStatus } from "../../entity/Task";
import createTask from "../createTask";
import listTasks from "../listTasks";

connection.auto();

const UUID = "0fc2cb51-2c31-43fc-8858-d1504293d147";

describe("services.deleteTask", () => {
  it("should delete an existing task", async () => {
    const task = await createTask({ name: "test" });
    expect(await listTasks()).toHaveLength(1);

    await deleteTask(task.id);
    expect(await listTasks()).toHaveLength(0);
  });

  it("should fail deleting a non-existing task", async () => {
    await expect(deleteTask(UUID)).rejects.toThrowError("Can not delete");
  });
});
