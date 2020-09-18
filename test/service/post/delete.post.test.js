require("../../test.setup");

const { InvalidInputError } = require("../../../src/error/InvalidInputError");
const { NotFoundError } = require("../../../src/error/NotFoundError");

const {
  saveUser,
  findUserById
} = require("../../../src/database/repository/user.repo");

const { findPostById } = require("../../../src/database/repository/post.repo");

const { createPost, deletePost } = require("../../../src/service/post");

describe("Delete post", () => {
  it("Validation", async () => {
    await expect(deletePost("")).rejects.toThrow(InvalidInputError);
    await expect(deletePost(" ")).rejects.toThrow(InvalidInputError);
  });

  it("Post not found", async () => {
    await expect(deletePost("507f1f77bcf86cd799439011")).rejects.toThrow(
      NotFoundError
    );
  });

  it("Delete Post OK", async () => {
    let user = await saveUser({
      name: "abdo",
      email: "abdo@gmail.com",
      password: "123456789"
    });

    let post = await createPost({
      uid: user._id.toString(),
      content: "Hello World"
    });

    await deletePost(post._id.toString());

    user = await findUserById(user._id.toString());
    expect(user.posts && user.posts.includes(post._id.toString())).toBeFalsy();

    post = await findPostById(post._id.toString());
    expect(post).toBeNull();
  });
});
