const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { optionsValidCreateMovie } = require('../utils/optionsCelebrate');
const { optionsValidDeleteMovie } = require('../utils/optionsCelebrate');

router.get('/', getMovies);
router.post('/', celebrate(optionsValidCreateMovie), createMovie);
router.delete('/:id', celebrate(optionsValidDeleteMovie), deleteMovie);

module.exports = router;
