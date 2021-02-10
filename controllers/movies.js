const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
// const BadRequestError = require('../errors/BadRequestError');
const {
  OK_CODE,
  CREATE_CODE,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({})
    .orFail(() => {
      throw new NotFoundError('Еще нет сохраненных фильмов');
    })
    .then((user) => res.status(OK_CODE).send(user))
    .catch(next);
};

const createMovie = (req, res, next) => {
  Movie.create(req.body)
    .then(() => {
      res.status(CREATE_CODE).send({ message: 'Пользователь успешно создан!' });
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(OK_CODE).send({ message: 'успешно удалено!' });
    })
    .catch(next);
};
module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
