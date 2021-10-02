import * as jwt from "jsonwebtoken";
import { getConnection } from "typeorm";
import { User } from "../../entity/User";
import { AccessTokenClaims } from "../../types";
import getMasterSecret from "../../utils/getMasterSecret";

export default async function authenticateAccessToken(accessToken: string) {
  try {
    const claims = jwt.verify(accessToken, getMasterSecret(), {
      algorithms: ["HS512"],
    }) as AccessTokenClaims;
    if (claims.exp === undefined) throw new Error('Invalid Token: Missing "exp" claim.');

    const connection = getConnection();
    const userRepo = connection.getRepository(User);

    return await userRepo.findOne(claims.user_id);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) return undefined;
    throw e;
  }
}
