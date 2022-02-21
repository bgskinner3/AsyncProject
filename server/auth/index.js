const loginRouter = require('express').Router();
const {
  models: { User },
} = require('../db');


loginRouter.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});
loginRouter.post('/signup', async (req, res, next) => {
  try {
    // we trust that our users will only pass in a username and password AND our 
    //browser only allows is to form inputs so it shouldnt matter what 
    //we do in the backend becsue we are protected ...right? 
    const { username, password } = req.body
    // destructuring both of these helps prevent injection attacks
    // by way of making the user an admin. 
    const user = await User.create({ username, password});
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});
// loginRouter.post('/signup', async (req, res, next) => {
//   try {
//     const user = await User.create(req.body);
//     res.send({ token: await user.generateToken() });
//   } catch (err) {
//     if (err.name === 'SequelizeUniqueConstraintError') {
//       res.status(401).send('User already exists');
//     } else {
//       next(err);
//     }
//   }
// });

loginRouter.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

module.exports = loginRouter;

// const router = require('express').Router();
// const {
//   models: { User },
// } = require('../db');
// module.exports = router;

// router.post('/login', async (req, res, next) => {
//   try {
//     res.send({ token: await User.authenticate(req.body) });
//   } catch (err) {
//     next(err);
//   }
// });

// router.post('/signup', async (req, res, next) => {
//   try {
//     const user = await User.create(req.body);
//     res.send({ token: await user.generateToken() });
//   } catch (err) {
//     if (err.name === 'SequelizeUniqueConstraintError') {
//       res.status(401).send('User already exists');
//     } else {
//       next(err);
//     }
//   }
// });

// router.get('/me', async (req, res, next) => {
//   try {
//     res.send(await User.findByToken(req.headers.authorization));
//   } catch (ex) {
//     next(ex);
//   }
// });