const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');
  response.json(users);
});

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (username.length <= 3 || password.length <= 3) {
    return response.status(400).json({
      error:
        'Invalid entries, username and password must have more than 3 characters',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    password: passwordHash,
  });

  const savedUser = await user.save();

  response.json({ user: savedUser });
});

module.exports = userRouter;
