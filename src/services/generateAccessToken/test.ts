import generateAccessToken from ".";
import { User } from "../../entity/User";

const VALID_EMAIL = "test@test.com";
const DISPLAY_NAME = "Test User";

describe("services.generateAccessToken", () => {
  it("should create an access token for a provided user", async () => {
    const user = new User();
    user.id = "TEST-USER-ID";
    user.displayName = DISPLAY_NAME;
    user.email = VALID_EMAIL;

    const accessToken = generateAccessToken(user);
    expect(accessToken).toBeTruthy();
  });
});
