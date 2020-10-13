const { getTimelineSchema } = require("./getTimeline.schema");

const { InvalidInputError } = require("../../../error/InvalidInputError");
const { NotFoundError } = require("../../../error/NotFoundError");

const { validate } = require("../../../util/validator.util");
const TreeMap = require("treemap-js");

const { findUserById } = require("../../../database/repository/user.repo");
const { findPostById } = require("../../../database/repository/post.repo");

/**
 * Returns all timeline posts for the user
 * @async
 * @param {String} userId Id of the signed user
 */
module.exports.getTimeline = async userId => {
  // validation
  const result = await validate({ uid: userId }, getTimelineSchema);
  if (result) {
    throw new InvalidInputError(result);
  }

  // Check that user exists
  const user = await findUserById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  // Following users
  const following = user["following"];

  // Get the IDs of all posts
  let posts = [];
  for (element of following) {
    let user = await findUserById(element);
    posts = posts.concat(user.posts);
  }

  // If there are no posts then return a Notfound Erro
  if (!posts || posts.length === 0) {
    throw new NotFoundError("No Posts found");
  }

  // Get the data of the posts and sort them in the tree map
  const queries = posts.map(id => findPostById(id));
  posts = await Promise.all(queries);
  const postsData = new TreeMap();
  posts.forEach(post => postsData.set(post.time, post));

  // Put the elements of the map into a list and reverse it
  let res = [];
  postsData.each((value, key) => res.push(value));
  res = res.reverse();

  // Return the response
  return res;
};
