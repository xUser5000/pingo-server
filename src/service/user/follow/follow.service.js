const { followSchema } = require("./follow.schema");

const { NotFoundError } = require("../../../error/NotFoundError");
const { InvalidInputError } = require("../../../error/InvalidInputError");
const { ForbiddenError } = require("../../../error/ForbiddenError");

const {
  findUserById,
  addFollower,
  addFollowing
} = require("../../../database/repository/user.repo");

const { validate } = require("../../../util/validator.util");

module.exports.follow = async ({ userA, userB }) => {
  // validation
  const validationResult = await validate({ userA, userB }, followSchema);
  if (validationResult) {
    throw new InvalidInputError(validationResult);
  }

  // Forbid following the same user
  if (userA === userB) throw new ForbiddenError("You cannot follow yourself");

  // Check the users exist
  const A = await findUserById(userA);
  const B = await findUserById(userB);
  if (!A || !B) throw new NotFoundError("Some users were not found");

  // Assert that UserA does not already follow B
  if (A.following.includes(userB) || B.followers.includes(userA)) {
    throw new ForbiddenError("You already follow that user");
  }

  // Record the follow relation
  await addFollowing(userA, userB);
  await addFollower(userB, userA);
};
