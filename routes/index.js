const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const moviesRoutes = require('./moviesRoutes');
const auth = require('../middlewares/auth');
const { signup, signin } = require('../controllers/users');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.post('/signin/', signin);
router.post('/signup/', signup);
router.use(auth);
router.use('/users/', usersRoutes);
router.use('/movies/', moviesRoutes);
router.use((req, res, next) => {
  res.status(404).send({ error: 'Not found' });
  next();
});
module.exports = router;
