const User = require("../models/user");

const getAdminUser = (email) => {
  return User.findOne({ email });
};

const postAdminUser = (email, password, user_type) => {
  const newUser = new User({
    email,
    password,
    user_type,
  });
  return newUser.save();
};

module.exports = {
  getAdminUser,
  postAdminUser,
};
