const { HttpError } = require("../error");
const { InvalidInputError } = require("../error/InvalidInputError");
const { createError } = require("./createError");

/**
 * @description A thin wrapper around services for handling responses and errors
 * (Curried function)
 * @async
 * @param {Service} service The business logic
 * @param {Response} res The response object provided by express
 * @param  {...any} args The service arguments
 */
const controller = res => service => async (...args) => {
  try {
    const result = await service(...args);
    res.send(result);
  } catch (e) {
    /* istanbul ignore else */
    if (e instanceof HttpError) {
      if (e instanceof InvalidInputError) {
        res.status(e.code).send(createError(...JSON.parse(e.message)));
      } else {
        res.status(e.code).send(createError(e.message));
      }
    } else {
      res.status(500).send(createError("Internal server error"));
      console.log(e);
    }
  }
};

module.exports = { controller };
