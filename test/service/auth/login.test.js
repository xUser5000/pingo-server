require("../../test.setup");

const { NotFoundError } = require("../../../src/error/NotFoundError");
const { InvalidInputError } = require("../../../src/error/InvalidInputError");

const { login, register } = require("../../../src/service/auth");

describe("Login test", () => {
  it("Validation testing", async () => {
    const arr = [];
    arr[0] = { email: "", password: "" };
    arr[1] = { email: "abdallah@gmail.com", password: "" };
    arr[2] = { email: "abdallah@gmail.com" };
    arr[3] = { email: "abdallah@.com", password: "123456789" };
    arr[4] = { email: "abdallah", password: "123456789" };
    arr[5] = { email: "", password: "123456789" };
    arr[6] = { password: "123456789" };
    arr[7] = {};
    arr[8] = { email: " ", password: " " };

    for (obj of arr)
      await expect(register(obj)).rejects.toThrow(InvalidInputError);
  });

  it("Did not find the user", async () => {
    const user = { email: "abdallah@gmail.com", password: "1234567890" };
    await expect(login(user)).rejects.toThrow(NotFoundError);
  });

  it("Password is not correct", async () => {
    const user = { email: "abdallah@gmail.com", password: "123456789" };
    await register({ ...user, username: "3by9nv9nbv" });

    await expect(
      login({ email: "abdallah@gmail.com", password: "123" })
    ).rejects.toThrow(NotFoundError);
  });

  it("Login correctly", async () => {
    const user = {
      email: "abdallah@gmail.com",
      password: "123456789"
    };
    const document = await register({
      ...user,
      username: "abdallah500"
    });

    const result = await login(user);

    expect(result).toHaveProperty("user");
    expect(result).toHaveProperty("token");
  });
});
