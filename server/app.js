const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');

//if you are not in the production enviorment,
// you want to access the secrets.js file 
// inside or your local machine (each dev should have one)
// ---> developemnt, test

if(process.env.NODE.ENV !== 'production') require('../secrets')


// const SECRET_KEY = process.env.SECRET_KEY


//logging middware
app.use(morgan('dev'));



//body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//api routes and auth routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);




//staic file-serving middleware
app.use(express.static(path.join(__dirname, '..', '/public/')));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})



app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});


app.use((err, req, res) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;