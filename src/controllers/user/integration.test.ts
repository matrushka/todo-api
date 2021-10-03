import server from "../../../test/server";
import createUser from "../../services/createUser";
import generateAccessToken from "../../services/generateAccessToken";
import axios from "axios";

server.auto();

const VALID_EMAIL = "test@test.com";

describe("controllers.user", () => {
  it("should return the user for the provided token", async () => {
    const user = await createUser({ email: VALID_EMAIL });
    const accessToken = generateAccessToken(user);

    const resp = await axios.get<{
      user: { displayName: string | null; id: string; email: string };
    }>(server.getUrl("/users/me"), { params: { accessToken } });

    expect(resp.status).toBe(200);

    const userInResponse = resp.data.user;
    expect(userInResponse.id).toEqual(user.id);
    expect(userInResponse.displayName).toEqual(user.displayName);
    expect(userInResponse.email).toEqual(user.email);
  });

  it("should faile when there is no token provided", async () => {
    await expect(axios.get(server.getUrl("/users/me"))).rejects.toThrowError(
      "Request failed with status code 401"
    );
  });

  it.todo("should fail for a token missing exp field");
  it.todo("should fail for a token with a misleading alg claim");
});
