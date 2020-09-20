require("../../test.setup");

const fs = require("fs");
const path = require("path");

const { InvalidInputError } = require("../../../src/error/InvalidInputError");
const { NotFoundError } = require("../../../src/error/NotFoundError");

const { createPost } = require("../../../src/service/post");

const {
  saveUser,
  findUserById
} = require("../../../src/database/repository/user.repo");

describe("Create Post", () => {
  it("Validation", async () => {
    const arr = [];

    arr[0] = {};
    arr[1] = { uid: "" };
    arr[2] = { uid: " " };
    arr[3] = { uid: "123456789" };
    arr[4] = { uid: "123456789", content: "" };
    arr[5] = { uid: "123456789", image: " " };

    for (const obj of arr)
      await expect(createPost(obj)).rejects.toThrow(InvalidInputError);
  });

  it("User not found", async () => {
    const base64 = Buffer.from("Hello World").toString("base64");

    const obj = {
      uid: "5349b4ddd2781d08c09890f3",
      content: "Hello World",
      image: base64
    };

    await expect(createPost(obj)).rejects.toThrow(NotFoundError);
  });

  it("Create post OK", async () => {
    let user = await saveUser({
      username: "abdo",
      email: "abdallah@gmail.com",
      password: "123456"
    });

    const image = fs.readFileSync(
      path.join(__dirname, "gon.base64.txt"),
      "utf-8"
    );

    const req = {
      uid: user._id.toString(),
      content: "Hello World",
      image
    };

    const res = await createPost(req);

    expect(res).toHaveProperty("author", req.uid);
    expect(res).toHaveProperty("content", req.content);
    expect(res).toHaveProperty("image");
    expect(res).toHaveProperty("time");

    user = await findUserById(user._id.toString());

    expect(user.posts.includes(res._id.toString())).toBe(true);
  });
});
