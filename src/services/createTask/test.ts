import createTask from ".";
import connection from "../../../test/connection";
import { TaskStatus } from "../../entity/Task";

connection.auto();

describe("services.createTask", () => {
  it("should create a task with valid inputs", async () => {
    const task = await createTask({ name: "test" });

    expect(task.id).not.toBeUndefined();
    expect(task.status).toBe(TaskStatus.TO_DO);
    expect(task.name).toBe("test");
    expect(task.createdAt).not.toBeUndefined();
    expect(task.updatedAt).not.toBeUndefined();
  });
});
