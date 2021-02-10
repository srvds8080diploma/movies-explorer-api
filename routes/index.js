const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const moviesRoutes = require('./moviesRoutes');
const auth = require('../middlewares/auth');
const { signup, signin } = require('../controllers/users');

router.post('/signin/', signin);
router.post('/signup', signup);
router.use(auth);
router.use('/users/', usersRoutes);
router.use('/movies/', moviesRoutes);

module.exports = router;
