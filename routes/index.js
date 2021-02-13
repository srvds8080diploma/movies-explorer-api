const router = require('express').Router();
const { celebrate } = require('celebrate');
const usersRoutes = require('./usersRoutes');
const moviesRoutes = require('./moviesRoutes');
const auth = require('../middlewares/auth');
const { signup, signin } = require('../controllers/users');
const crashTest = require('../controllers/crashTest');
const { optionsValidSign } = require('../utils/optionsCelebrate');

router.post('/signin/', celebrate(optionsValidSign), signin);
router.post('/signup/', celebrate(optionsValidSign), signup);
router.use(auth);
router.get('/crash-test', crashTest);
router.use('/users/', usersRoutes);
router.use('/movies/', moviesRoutes);
router.use((req, res, next) => {
  res.status(404).send({ error: 'Not found' });
  next();
});
module.exports = router;
