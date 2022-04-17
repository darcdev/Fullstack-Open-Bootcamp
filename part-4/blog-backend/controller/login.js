const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const config = require('../utils/config');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect = user
    ? await bcrypt.compare(password, user.password)
    : false;
  if (!user || !passwordCorrect) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const dataUserToken = {
    username: user.username,
    id: user.id,
  };
  const token = jwt.sign(dataUserToken, config.JWT_SECRET_KEY);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
