const userRouter = require('express').Router();
const {
  models: { User },
} = require('../db');

module.exports = userRouter;
const { requireToken, isAdmin } = require('./gatekeeping');

userRouter.get('/', requireToken, isAdmin, async (req, res) => {
  try {
    //if we get passed by the token, we can guranatee that we have a user
    // we have access to req.user
    const allusers = await User.findAll({
      //only access user id and username
      attributes: ['id', 'username'],
    });
    res.json(allusers);
  } catch (error) {
    console.error(error);
  }
});

// // matches POST requests to /api/user/
// userRouter.post('/', function (req, res, next) {
//   /* etc */
// });
// // matches PUT requests to /api/user/:usrId
// userRouter.put('/:userId', function (req, res, next) {
//   /* etc */
// });
// // matches DELETE requests to /api/user/:userId
// userRouter.delete('/:userId', function (req, res, next) {
//   /* etc */
// });
