import { User } from "../../entity/User";
import * as jwt from "jsonwebtoken";
import { AccessTokenClaims } from "../../types";
import getMasterSecret from "../../utils/getMasterSecret";

export default function generateAccessToken(user: User) {
  return jwt.sign({ user_id: user.id } as AccessTokenClaims, getMasterSecret(), {
    algorithm: "HS512",
    expiresIn: "1 day",
  });
}
