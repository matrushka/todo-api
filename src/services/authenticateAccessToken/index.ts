import * as jwt from "jsonwebtoken";
import { getConnection } from "typeorm";
import { User } from "../../entity/User";
import { AccessTokenClaims } from "../../types";
import getMasterSecret from "../../utils/getMasterSecret";

export default async function authenticateAccessToken(accessToken: string) {
  const claims = jwt.verify(accessToken, getMasterSecret(), {
    algorithms: ["HS512"],
  }) as AccessTokenClaims;
  if (claims.exp === undefined) throw new Error('Invalid Token: Missing "exp" claim.');

  const connection = getConnection();
  const repository = connection.getRepository(User);

  const user = await repository.findOne(claims.user_id);
  if (!user) throw new Error("Invalid token: Invalid user_id.");

  return user;
}
