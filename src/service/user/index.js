const { getProfile } = require("./profile/profile.service");
const { searchUsers } = require("./search/search.user.service");
const { follow } = require("./follow/follow.service");
const { unfollow } = require("./unfollow/unfollow.service");

module.exports = {
  getProfile,
  searchUsers,
  follow,
  unfollow
};
