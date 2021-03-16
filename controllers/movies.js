const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ConflictError = require('../errors/ConflictError');
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
  const { _id } = req.user;
  const { ...rest } = req.body;
  Movie.create({ ...rest, owner: _id })
    .then((movie) => {
      res.status(CREATE_CODE).send({ movie, message: 'Фильм сохранен!' });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Фильм уже добавлен'));
      }
      return next();
    });
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Такого фильма не существует'));
      }
      if (movie.owner !== req.user._id) {
        return next(new ForbiddenError('Нельзя удалять чужие фильмы'));
      }
      return movie.remove()
        .then((deletedMovie) => {
          if (deletedMovie) {
            res.status(OK_CODE).send({ movie: deletedMovie, message: 'Фильм успешно удален' });
          }
        })
        .catch(next);
    });
};
module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
