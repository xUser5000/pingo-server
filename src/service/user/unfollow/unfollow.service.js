const { unfollowSchema } = require("./unfollow.schema");

const { NotFoundError } = require("../../../error/NotFoundError");
const { InvalidInputError } = require("../../../error/InvalidInputError");
const { ForbiddenError } = require("../../../error/ForbiddenError");

const {
  findUserById,
  removeFollower,
  removeFollowing
} = require("../../../database/repository/user.repo");

const { validate } = require("../../../util/validator.util");

module.exports.unfollow = async ({ userA, userB }) => {
  // validation
  const validationResult = await validate({ userA, userB }, unfollowSchema);
  if (validationResult) {
    throw new InvalidInputError(validationResult);
  }

  // Forbid unfollowing the same user
  if (userA === userB) throw new ForbiddenError("You cannot unfollow yourself");

  // Check the users exist
  const A = await findUserById(userA);
  const B = await findUserById(userB);
  if (!A || !B) throw new NotFoundError("Some users were not found");

  // Assert that UserA already follows B
  if (!A.following.includes(userB) || !B.followers.includes(userA)) {
    throw new ForbiddenError("You don't even follow that user");
  }

  // Execute the unfollow command
  await removeFollowing(userA, userB);
  await removeFollower(userB, userA);
};
