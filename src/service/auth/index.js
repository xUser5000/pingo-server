const { register } = require("./register/register.service");
const { login } = require("./login/login.service");
const { authorize } = require("./authorize/authorize.service");

module.exports = {
  register,
  login,
  authorize,
};
