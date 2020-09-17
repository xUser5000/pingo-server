require("../../test.setup");

const { NotFoundError } = require("../../../src/error/NotFoundError");
const { InvalidInputError } = require("../../../src/error/InvalidInputError");

const { searchUsers } = require("../../../src/service/user");

const {
  saveUser,
  createIndexes
} = require("../../../src/database/repository/user.repo");

describe("Search for users", () => {
  it("Validation", async () => {
    const arr = ["", " "];

    await expect(searchUsers(arr[0])).rejects.toThrow(InvalidInputError);
    await expect(searchUsers(arr[1])).rejects.toThrow(InvalidInputError);
  });

  it("No user found", async () => {
    createIndexes();

    await saveUser({
      username: "xUser5000",
      email: "abdallah@gmail.com",
      password: "123456789"
    });

    await saveUser({
      username: "abdo",
      email: "abdo@gmail.com",
      password: "1223456789"
    });

    await expect(searchUsers("Ahmed")).rejects.toThrow(NotFoundError);
  });

  it("Found users", async () => {
    createIndexes();

    await saveUser({
      username: "abdallah",
      email: "abdallah@gmail.com",
      password: "123456789"
    });

    const result = await searchUsers("abdallah");

    expect(result).not.toBeNull();
    expect(result).toHaveProperty("users");

    const users = result.users;

    expect(users).toHaveLength(1);
  });
});
