const router = require('express').Router();

//only use user for now
router.use('/users', require('./user'))




router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;