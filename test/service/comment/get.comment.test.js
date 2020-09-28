require("../../test.setup");

const { InvalidInputError } = require("../../../src/error/InvalidInputError");
const { NotFoundError } = require("../../../src/error/NotFoundError");

const { getComment } = require("../../../src/service/comment");

const {
  saveComment
} = require("../../../src/database/repository/comment.repo");

describe("Get Comment", () => {
  it("Validation", async () => {
    const arr = [[], [""], [" "], ["this"]];

    for (obj of arr)
      await expect(getComment(obj)).rejects.toThrow(InvalidInputError);
  });

  it("Comment not found", async () => {
    const obj = ["54759eb3c090d83494e2d804"];
    await expect(getComment(obj)).rejects.toThrow(NotFoundError);
  });

  it("Get Comment OK", async () => {
    const comment = await saveComment({
      time: new Date().getTime(),
      userId: "abdo",
      postId: "POST123456789",
      content: "Hello World"
    });

    const res = await getComment(comment._id.toString());

    expect(res).toHaveProperty("time", comment.time);
    expect(res).toHaveProperty("userId", comment.userId);
    expect(res).toHaveProperty("postId", comment.postId);
    expect(res).toHaveProperty("content", comment.content);
  });
});
