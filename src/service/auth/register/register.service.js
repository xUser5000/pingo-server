const { registerSchema } = require("./register.schema");

const { InvalidInputError } = require("../../../error/InvalidInputError");
const { ForbiddenError } = require("../../../error/ForbiddenError");

module.exports.registerFactory = ({
  validate,
  findUserByEmail,
  findUserByUsername,
  saveUser,
  hash
}) => async req => {
  // preventing further modification of the object
  req = Object.freeze(req);

  // validation
  const result = await validate(req, registerSchema);
  if (result) {
    throw new InvalidInputError(result);
  }

  // look for users with same email address
  if (await findUserByEmail(req["email"])) {
    throw new ForbiddenError("Email address is already in use");
  }

  // look for users with same username
  if (await findUserByUsername(req["username"])) {
    throw new ForbiddenError("Username is already in use");
  }

  const user = { ...req };

  // hash the password
  user["password"] = hash(user.password);

  // add a default bio
  user["bio"] = "I am a new Pingo user";

  // joined since
  user["joined"] = new Date().getTime();

  // save the user document
  return await saveUser(user);
};
