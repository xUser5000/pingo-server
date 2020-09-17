require("../../test.setup");

const { NotFoundError } = require("../../../src/error/NotFoundError");
const { InvalidInputError } = require("../../../src/error/InvalidInputError");

const { searchPosts } = require("../../../src/service/post");

const {
  savePost,
  createIndexes
} = require("../../../src/database/repository/post.repo");

describe("Search posts", () => {
  it("Validation", async () => {
    const arr = ["", " "];
    await expect(searchPosts(arr[0])).rejects.toThrow(InvalidInputError);
    await expect(searchPosts(arr[1])).rejects.toThrow(InvalidInputError);
  });

  it("No posts found", async () => {
    createIndexes();

    await savePost({
      author: "Abdo",
      content: "Hello World"
    });

    await savePost({
      author: "Ahem",
      content: "My apologies"
    });

    await expect(searchPosts("Ahmed")).rejects.toThrow(NotFoundError);
  });

  it("Found posts", async () => {
    createIndexes();

    await savePost({
      author: "Abdo",
      content: "Hello World"
    });

    const result = await searchPosts("Hello");

    expect(result).not.toBeNull();
    expect(result).toHaveProperty("posts");

    const posts = result.posts;

    expect(posts).toHaveLength(1);
  });
});
