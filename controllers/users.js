const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const {
  OK_CODE,
} = require('../utils/constants');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователя не существует');
    })
    .then((user) => res.status(OK_CODE).send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { _id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(_id, { name, about }, { new: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь по заданному id отсутствует в базе');
    })
    .then((user) => {
      res.status(OK_CODE).send(user);
    })
    .catch(next);
};
module.exports = {
  getUser,
  updateUser,
};
