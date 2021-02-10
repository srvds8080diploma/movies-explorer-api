const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const moviesRoutes = require('./moviesRoutes');

router.use('/users/', usersRoutes);
router.use('/movies/', moviesRoutes);

module.exports = router;
