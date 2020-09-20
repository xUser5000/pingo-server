const { getProfile } = require("./profile/profile.service");
const { searchUsers } = require("./search/search.user.service");
const { follow } = require("./follow/follow.service");

module.exports = {
  getProfile,
  searchUsers,
  follow
};
