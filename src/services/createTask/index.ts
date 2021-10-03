import { validate } from "class-validator";
import { getConnection } from "typeorm";
import { Task } from "../../entity/Task";
import { EntityValidationError, TaskStatus } from "../../types";

export default async function createTask(props: { name: string; status?: TaskStatus }) {
  const task = new Task();
  task.name = props.name;
  if (props.status) task.status = props.status;

  const errors = await validate(task);
  if (errors.length) {
    const error = new Error("Failed Validation") as EntityValidationError;
    error.validationErrors = errors;
    throw error;
  }

  const connection = getConnection();
  const taskRepo = connection.getRepository(Task);

  return taskRepo.save(task);
}
