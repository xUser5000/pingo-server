require("../../test.setup");

const { InvalidInputError } = require("../../../src/error/InvalidInputError");
const { ForbiddenError } = require("../../../src/error/ForbiddenError");

const { register } = require("../../../src/service/auth");

const {
  findUserByEmail
} = require("../../../src/database/repository/user.repo");

describe("Create a new account", () => {
  it("Validation testing", async () => {
    const arr = [];
    arr[0] = {
      username: "",
      email: "abdallah@gmail.com",
      password: "123456789"
    };
    arr[1] = {
      email: "abdallah@gmail.com",
      password: "123456789"
    };
    arr[2] = {
      username: "xUser5000",
      password: "123456789"
    };
    arr[3] = {
      username: "xUser5000",
      email: "abdallah@gmail.com"
    };
    arr[4] = {
      username: "121",
      email: "abdallah@gmail.com",
      password: "123456789"
    };
    arr[5] = {
      username: "xUser5000",
      email: "abdallah.com",
      password: "123456789"
    };
    arr[6] = {
      username: "xUser5000",
      email: "abdallah",
      password: "123456789"
    };
    arr[7] = {
      username: "xUser5000",
      email: "abdallah@.com",
      password: "123456789"
    };
    arr[8] = {
      username: "xUser5000",
      email: "abdallah@gmail.com",
      password: "123"
    };
    arr[9] = {
      username: " ",
      email: "abdallah@gmail.com",
      password: "123456789"
    };

    arr[10] = {};

    arr.forEach(async obj => {
      await expect(register(obj)).rejects.toThrow(InvalidInputError);
    });
  });

  it("Email address is already in use", async () => {
    const user = {
      username: "abdallah5000",
      email: "abdallah@gmail.com",
      password: "123456789"
    };
    await register(user);

    await expect(register(user)).rejects.toThrow(ForbiddenError);
  });

  it("Username is already in use", async () => {
    const user = {
      username: "abdallah5000",
      email: "abdallah@gmail.com",
      password: "123456789"
    };
    await register(user);

    user.email = "hehehe@mail.com";
    await expect(register(user)).rejects.toThrow(ForbiddenError);
  });

  it("Create account correctly", async () => {
    const user = {
      username: "abdallah5000",
      email: "abdallah@gmail.com",
      password: "123456789"
    };
    const result = await register(user);
    await expect(findUserByEmail(user.email)).resolves.not.toBe(null);
    expect(result).toHaveProperty("username", user.username);
    expect(result).toHaveProperty("email", user.email);
    expect(result).toHaveProperty("password");
    expect(result).toHaveProperty("bio");
    expect(result).toHaveProperty("joined");
  });
});
