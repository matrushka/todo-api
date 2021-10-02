import authenticateAccessToken from ".";
import connection from "../../../test/connection";
import createUser from "../createUser";
import generateAccessToken from "../generateAccessToken";

connection.auto();

const VALID_EMAIL = "test@test.com";

describe("services.authenticateAccessToken", () => {
  it("should return the user for the provided token", async () => {
    const user = await createUser({ email: VALID_EMAIL });
    const accessToken = generateAccessToken(user);

    const authenticatedUser = await authenticateAccessToken(accessToken);
    expect(authenticatedUser).toStrictEqual(user);
  });

  it.todo("should fail for a token missing exp field");
  it.todo("should fail for a token with a misleading alg claim");
});
