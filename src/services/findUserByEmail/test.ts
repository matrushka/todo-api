import createUser from "../createUser";
import connection from "../../../test/connection";
import findUserByEmail from ".";

connection.auto();

const VALID_EMAIL = "test@test.com";

describe("services.findUserByEmail", () => {
  it("should find an existing user", async () => {
    await createUser({ email: VALID_EMAIL });
    const user = await findUserByEmail(VALID_EMAIL);

    expect(user.id).not.toBeUndefined();
    expect(user.email).toBe(VALID_EMAIL);
  });

  it("should return undefined for an non-existing user", async () => {
    const user = await findUserByEmail(VALID_EMAIL);
    expect(user).toBeUndefined();
  });
});
