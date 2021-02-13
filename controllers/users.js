const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');
const {
  OK_CODE,
  CREATE_CODE,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователя не существует');
    })
    .then(({ email, name }) => res.status(OK_CODE).send({ email, name }))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { _id } = req.user;
  const { name, email } = req.body;
  User.findByIdAndUpdate(_id, { name, email }, { new: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь по заданному id отсутствует в базе');
    })
    .then(({ name: updatedName, email: updatedEmail }) => {
      res.status(OK_CODE).send({ name: updatedName, email: updatedEmail });
    })
    .catch(next);
};

const signup = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь существует');
      }
      return bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({
            name,
            email,
            password: hash,
          })
            .then(({ _id, email: returnedEmail }) => {
              res.status(CREATE_CODE).send({ _id, email: returnedEmail, message: 'Пользователь успешно создан!' });
            })
            .catch(next);
        });
    })
    .catch(next);
};
const signin = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      const error = new UnauthorizedError('email или пароль неверные');
      next(error);
    });
};

module.exports = {
  getUser,
  updateUser,
  signin,
  signup,
};
