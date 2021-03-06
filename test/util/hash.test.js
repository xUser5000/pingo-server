const { hash, match } = require("../../src/util/hash.util");

describe("Hash util", () => {
  const password = "123456789";

  it("Hashing passwords", () => {
    const h = hash(password);
    expect(h).toHaveLength(60);
  });

  it("Matching passwords with hashes", () => {
    const h = hash(password);
    expect(match(password, h)).toBe(true);
  });
});
