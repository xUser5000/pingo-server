require("../../test.setup");

const { NotFoundError } = require("../../../src/error/NotFoundError");
const { InvalidInputError } = require("../../../src/error/InvalidInputError");
const { ForbiddenError } = require("../../../src/error/ForbiddenError");

const { follow, unfollow } = require("../../../src/service/user");

const {
  saveUser,
  findUserById
} = require("../../../src/database/repository/user.repo");

describe("Unfollow User", () => {
  it("Validation", async () => {
    const arr = [
      {},
      { userA: "" },
      { userB: "" },
      { userA: "", userB: "" },
      { userA: " ", userB: "" },
      { userA: "Hello", userB: " " },
      { userA: "352fg5", userB: "gui3y5" }
    ];

    for (obj of arr)
      await expect(unfollow(obj)).rejects.toThrow(InvalidInputError);
  });

  it("unfollowing the same user is fobidden", async () => {
    const obj = {
      userA: "54759eb3c090d83494e2d804",
      userB: "54759eb3c090d83494e2d804"
    };

    await expect(unfollow(obj)).rejects.toThrow(ForbiddenError);
  });

  it("User not found", async () => {
    const obj = {
      userA: "54759eb3c090d83494e2d804",
      userB: "507f1f77bcf86cd799439011"
    };
    await expect(unfollow(obj)).rejects.toThrow(NotFoundError);
  });

  it("Unfollow OK", async () => {
    const userA = (
      await saveUser({
        username: "Abdo",
        email: "abdallah@gmail.com",
        password: "123456789"
      })
    )._id.toString();

    const userB = (
      await saveUser({
        username: "Mostafa",
        email: "mostafa@gmail.com",
        password: "1232456789"
      })
    )._id.toString();

    await follow({ userA, userB });
    await unfollow({ userA, userB });

    const A = await findUserById(userA);
    expect(A.following.includes(userB)).toBeFalsy();

    const B = await findUserById(userB);
    expect(B.followers.includes(userA)).toBeFalsy();
  });

  it("unfolloing an already-unfollowing user is forbidden", async () => {
    const userA = (
      await saveUser({
        username: "Abdo",
        email: "abdallah@gmail.com",
        password: "123456789"
      })
    )._id.toString();

    const userB = (
      await saveUser({
        username: "Mostafa",
        email: "mostafa@gmail.com",
        password: "1232456789"
      })
    )._id.toString();

    await expect(unfollow({ userA, userB })).rejects.toThrow(ForbiddenError);
  });
});
