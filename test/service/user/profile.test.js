require("../../test.setup");

const { NotFoundError } = require("../../../src/error/NotFoundError");
const { InvalidInputError } = require("../../../src/error/InvalidInputError");

const { getProfile } = require("../../../src/service/user");

const { saveUser } = require("../../../src/database/repository/user.repo");

describe("Profile test", () => {
  it("Validation", async () => {
    const arr = [];
    arr[0] = null;
    arr[1] = [];
    arr[2] = [""];
    arr[3] = ["", " "];

    for (obj of arr)
      await expect(getProfile(obj)).rejects.toThrow(InvalidInputError);
  });

  it("User not found", async () => {
    let user = {
      email: "abdallah@gmail.com",
      password: "123456789"
    };
    user = await saveUser(user);

    await expect(getProfile(["507f191e810c19729de860ea"])).rejects.toThrow(
      NotFoundError
    );
  });

  it("Get profile correctly", async () => {
    let user1 = {
      email: "abdallah@gmail.com",
      password: "123456789"
    };
    let user2 = {
      email: "ahmed@gmail.com",
      password: "123456789"
    };
    obj1 = await saveUser(user1);
    obj2 = await saveUser(user2);

    await expect(getProfile([obj1._id.toString(), obj2._id.toString()]))
      .rejects;
    await expect(
      getProfile([obj1._id.toString(), obj2._id.toString()])
    ).resolves.toHaveLength(2);
    await expect(getProfile([obj1._id.toString()])).resolves;
    await expect(getProfile([obj1._id.toString()])).resolves.toHaveLength(1);
  });
});
