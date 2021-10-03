import { FindConditions, getConnection } from "typeorm";
import { Task, TaskStatus } from "../../entity/Task";

export type ListTasksQuery = {
  status?: TaskStatus;
};

export default async function listTasks(query: ListTasksQuery = {}) {
  const connection = getConnection();
  const taskRepo = connection.getRepository(Task);

  const where: FindConditions<Task> = {};
  if (query.status) where.status = query.status;

  return taskRepo.find({ where });
}
