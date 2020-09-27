require("../../test.setup");

const { InvalidInputError } = require("../../../src/error/InvalidInputError");
const { NotFoundError } = require("../../../src/error/NotFoundError");

const { createComment } = require("../../../src/service/comment");

const { saveUser } = require("../../../src/database/repository/user.repo");

const {
  savePost,
  findPostById
} = require("../../../src/database/repository/post.repo");

const {
  findCommentById
} = require("../../../src/database/repository/comment.repo");

describe("Create Comment", () => {
  it("Validation", async () => {
    const arr = [
      {},
      { userId: "" },
      { postId: "" },
      { content: "" },
      { userId: "gjoinh", postId: "gherghw", content: "Hello" }
    ];

    for (obj of arr)
      await expect(createComment(obj)).rejects.toThrow(InvalidInputError);
  });

  it("User not found", async () => {
    const obj = {
      userId: "5349b4ddd2781d08c09890f3",
      postId: "5349b4ddd2781d08c09890f3",
      content: "Hello World"
    };

    await expect(createComment(obj)).rejects.toThrow(NotFoundError);
  });

  it("Post not found", async () => {
    const user = await saveUser({
      username: "Hello",
      email: "abdo@gmail.com",
      password: "123456789"
    });

    const obj = {
      userId: user._id.toString(),
      postId: "5349b4ddd2781d08c09890f3",
      content: "Hello World"
    };

    await expect(createComment(obj)).rejects.toThrow(NotFoundError);
  });

  it("Comment OK", async () => {
    let user = await saveUser({
      username: "Hello",
      email: "abdo@gmail.com",
      password: "123456789"
    });

    let post = await savePost({
      author: user._id.toString(),
      content: "Hello World"
    });

    let comment = await createComment({
      userId: user._id.toString(),
      postId: post._id.toString(),
      content: "Hey guys!"
    });

    comment = await findCommentById(comment._id.toString());

    expect(comment).toHaveProperty("time");
    expect(comment).toHaveProperty("userId", user._id.toString());
    expect(comment).toHaveProperty("postId", post._id.toString());
    expect(comment).toHaveProperty("content");

    post = await findPostById(post._id.toString());

    expect(post.comments.includes(comment._id.toString())).toBeTruthy();
  });
});
