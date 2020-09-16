const { createPostSchema } = require("./create.schema");

const { InvalidInputError } = require("../../../error/InvalidInputError");
const { ForbiddenError } = require("../../../error/ForbiddenError");
const { NotFoundError } = require("../../../error/NotFoundError");

const { validate } = require("../../../util/validator.util");
const { isImage, upload } = require("../../../util/image.util");

const {
  findUserById,
  addPost,
  saveUser
} = require("../../../database/repository/user.repo");
const { savePost } = require("../../../database/repository/post.repo");

/**
 * Creates a new post
 * @async
 * @param {String} uid The id of the author
 * @param {String} content The text content of the post
 * @param {String} image The base64 encoded string of the image data
 * @returns {Post} The post object after inserting it into the DB
 */
module.exports.createPost = async ({ uid, content, image }) => {
  // validation
  const result = await validate({ uid, content, image }, createPostSchema);
  if (result) {
    throw new InvalidInputError(result);
  }

  // Don't allow an empty post
  if (!content && !image) {
    throw new InvalidInputError(["You must insert some text or post an image"]);
  }

  // search for user
  const user = await findUserById(uid);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  let url = null;
  if (image) {
    // check for file type
    if (!isImage(image)) throw new ForbiddenError("An image file is required");

    // upload the image
    url = await upload(image);
  }

  // save the post
  let post = {
    author: uid,
    time: new Date().getTime()
  };

  if (url) post.image = url;
  if (content) post.content = content;

  // save the post record to DB
  post = await savePost(post);

  // push the post id to the "posts" field in the user document
  await addPost(user._id.toString(), post._id.toString());

  return post;
};
