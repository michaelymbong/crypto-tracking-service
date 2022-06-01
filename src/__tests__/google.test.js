import { JWT } from "google-auth-library";
import { authenticate } from "../google";

describe("google.ts", () => {
  describe("authenticate", () => {
    test("returns a JWT object", async () => {
      const retval = await authenticate();

      expect(retval).toBeInstanceOf(JWT);
    });
  });
});
