import { validate } from "class-validator";
import { getConnection } from "typeorm";
import { User } from "../../entity/User";
import { EntityValidationError } from "../../types";

export default async function createUser(props: { email: string; displayName?: string }) {
  const user = new User();
  user.email = props.email;
  user.displayName = props.displayName;

  const errors = await validate(user);
  if (errors.length) {
    const error = new Error("Failed Validation") as EntityValidationError;
    error.validationErrors = errors;
    throw error;
  }

  const connection = getConnection();
  const userRepo = connection.getRepository(User);

  return userRepo.save(user);
}
