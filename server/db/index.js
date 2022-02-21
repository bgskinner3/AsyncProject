const db = require('./db');
const User = require('./models/User')
// add associations here

module.exports = {
  db,
  models: {
    User, 
  }
};
