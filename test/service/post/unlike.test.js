require("../../test.setup");

const { InvalidInputError } = require("../../../src/error/InvalidInputError");
const { NotFoundError } = require("../../../src/error/NotFoundError");
const { ForbiddenError } = require("../../../src/error/ForbiddenError");

const { unlike } = require("../../../src/service/post");

const {
  saveUser,
  findUserById
} = require("../../../src/database/repository/user.repo");
const {
  findPostById,
  savePost
} = require("../../../src/database/repository/post.repo");

describe("Unlike Post", () => {
  it("Validation", async () => {
    const arr = [
      { userId: "" },
      { postId: "" },
      { userId: "", postId: "" },
      { userId: "", postId: "h" },
      { userId: "a", postId: "" },
      { userId: "1", postId: "a" },
      { userId: "Hello", postId: "Hello" }
    ];

    for (obj of arr)
      await expect(unlike(obj)).rejects.toThrow(InvalidInputError);
  });

  it("User not found", async () => {
    const obj = {
      userId: "54759eb3c090d83494e2d804",
      postId: "54759eb3c090d83494e2d804"
    };

    await expect(unlike(obj)).rejects.toThrow(NotFoundError);
  });

  it("Post not found", async () => {
    const user = await saveUser({
      username: "abdo",
      email: "abdo@gmail.com",
      password: "123456789"
    });

    await expect(
      unlike({
        userId: user._id.toString(),
        postId: "54759eb3c090d83494e2d804"
      })
    ).rejects.toThrow(NotFoundError);
  });

  it("Unlike OK", async () => {
    let user = await saveUser({
      username: "abdo",
      email: "abdo@gmail.com",
      password: "123456789"
    });

    let post = await savePost({
      author: "abdo",
      content: "Hello World",
      likes: [user._id.toString()]
    });

    await unlike({
      userId: user._id.toString(),
      postId: post._id.toString()
    });

    post = await findPostById(post._id.toString());

    expect(post.likes.includes(user._id.toString())).toBeFalsy();
  });

  it("Alreay unliked", async () => {
    let user = await saveUser({
      username: "abdo",
      email: "abdo@gmail.com",
      password: "123456789"
    });

    let post = await savePost({
      author: "abdo",
      content: "Hello World",
      likes: [user._id.toString()]
    });

    await unlike({
      userId: user._id.toString(),
      postId: post._id.toString()
    });

    await expect(
      unlike({
        userId: user._id.toString(),
        postId: post._id.toString()
      })
    ).rejects.toThrow(ForbiddenError);
  });
});
