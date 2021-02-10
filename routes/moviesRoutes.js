const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies); // возвращает все сохраненные пользователем фильиы

router.post('/', createMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
