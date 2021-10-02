import { getConnection } from "typeorm";
import { Task } from "../../entity/Task";

export default async function deleteTask(taskId: string) {
  const connection = getConnection();
  const taskRepo = connection.getRepository(Task);

  const result = await taskRepo.delete(taskId);
  if (!result.affected) throw new Error("Can not delete non-existing task.");
}
