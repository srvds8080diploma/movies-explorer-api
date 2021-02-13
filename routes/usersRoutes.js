const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  updateUser,
  getUser,
} = require('../controllers/users');
const { optionsValidUpdateUser } = require('../utils/optionsCelebrate');

router.get('/me', getUser);
router.patch('/me', celebrate(optionsValidUpdateUser), updateUser);

module.exports = router;
