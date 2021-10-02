import { getConnection } from "typeorm";
import { User } from "../../entity/User";

export default async function findUserByEmail(email: string) {
  const connection = getConnection();
  const userRepository = connection.getRepository(User);
  return userRepository.findOne({ email });
}
