import { validate } from "class-validator";
import { getConnection } from "typeorm";
import { Task } from "../../entity/Task";
import { EntityValidationError, TaskStatus } from "../../types";

export default async function updateTask(
  id: string,
  props: { name?: string; status?: TaskStatus }
) {
  const connection = getConnection();
  const taskRepo = connection.getRepository(Task);

  const task = await taskRepo.findOneOrFail(id);
  if (props.name) task.name = props.name;
  if (props.status) task.status = props.status;

  const errors = await validate(task);
  if (errors.length) {
    const error = new Error("Failed Validation") as EntityValidationError;
    error.validationErrors = errors;
    throw error;
  }

  return taskRepo.save(task);
}
