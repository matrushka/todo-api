import createUser from ".";
import connection from "../../../test/connection";

connection.auto();

const VALID_EMAIL = "test@test.com";
const INVALID_EMAIL = "test.com";
const DISPLAY_NAME = "Test User";

describe("services.createUser", () => {
  it("should create a user with valid inputs", async () => {
    const user = await createUser({ email: VALID_EMAIL, displayName: DISPLAY_NAME });
    expect(user.id).not.toBeUndefined();
    expect(user.displayName).toBe(DISPLAY_NAME);
    expect(user.email).toBe(VALID_EMAIL);
  });

  it("should not create a user with an invalid email", async () => {
    await expect(createUser({ email: INVALID_EMAIL })).rejects.toThrowError("Failed Validation");
  });

  it("should not create a user for an existing email", async () => {
    await createUser({ email: VALID_EMAIL });
    await expect(createUser({ email: VALID_EMAIL })).rejects.toThrowError("duplicate key");
  });
});
