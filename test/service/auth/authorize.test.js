const { authorize } = require("../../../src/service/auth");

const { InvalidInputError } = require("../../../src/error/InvalidInputError");
const { UnAuthorizedError } = require("../../../src/error/UnAuthorizedError");

const { generateToken } = require("../../../src/util/token.util");

describe("Authorization test", () => {
  it("Malformed Token", async () => {
    await expect(authorize("")).rejects.toThrow(InvalidInputError);
  });

  it("Invalid token", async () => {
    const data = "1234";
    let token = generateToken(data);
    token = token.replace("g", "a");

    await expect(authorize(token)).rejects.toThrow(UnAuthorizedError);
  });

  it("Authorize a token", async () => {
    const data = "1234";
    const token = generateToken(data);

    await expect(authorize(token)).resolves.toBe(data);
  });
});
