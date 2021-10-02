import { getConnection } from "typeorm";
import { User } from "../../entity/User";

export default async function findUserByEmail(email: string) {
  const connection = getConnection();
  const userRepo = connection.getRepository(User);
  return userRepo.findOne({ email });
}
