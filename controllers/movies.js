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
      res.status(CREATE_CODE).send({ message: 'Фильм сохранен!' });
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Такого фильма не существует'));
      }
      return Movie.findByIdAndRemove(id)
        .then(() => {
          res.status(OK_CODE).send({ message: 'Фильм успешно удален' });
        })
        .catch(next);
    });
};
module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
