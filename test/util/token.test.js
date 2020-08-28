const {
  generateToken,
  getDataFromToken
} = require("../../src/util/token.util");

describe("Token util", () => {
  it("Generate Token", () => {
    const uid = "123456789";
    expect(typeof generateToken(uid)).toBe("string");
  });

  it("Encoding and decoding", () => {
    const uid = "123456789";
    expect(getDataFromToken(generateToken(uid))).toBe(uid);
    expect(getDataFromToken("sjkbguerbue")).toBe(null);
  });
});
