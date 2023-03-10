const { SECRET_KEY = 'dev-key' } = process.env;
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
        expiresIn: '7d',
      });
      res.send({ token })
      /* res.cookie("token", token, { httpOnly: true }); */
      next();
    })
    .catch(next);
};
