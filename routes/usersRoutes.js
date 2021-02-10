const router = require('express').Router();
const {
  updateUser,
  getUser,
} = require('../controllers/users');

router.get('/me', getUser);
router.put('/me', updateUser);

module.exports = router;
