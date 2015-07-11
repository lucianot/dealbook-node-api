/**
 * Auth actions
 */

'use strict';

var jwt = require('jwt-simple');
var secret =  require('../config/secret');
var User = require('./../models/User');

var auth = {

  login: function(req, res) {

    var email = req.body.email || '';
    var password = req.body.password || '';

    if (email == '' || password == '') {
      res.status(401).send('Invalid credentials');
      return;
    }

    // Fire a query to your DB and check if the credentials are valid
    User.findOne({
      email: email,
      password: password
    }, function(err, user) {
      if (user) {
        // If authentication is success, we will generate a token
        // and dispatch it to the client
        var token = generateToken(user);
        res.json(token);

      } else {
        // If authentication fails, we send a 401 back
        res.status(401).send('Invalid credentials');
      }
    });
  }

  // validate: function(email, password) {
  //   var user = User.findOne({
  //     email: email,
  //     password: password
  //   });
  //   console.log('user', user);
  //   return user;
  // },

  // validateUser: function(username) {
  //   // spoofing the DB response for simplicity
  //   var dbUserObj = { // spoofing a userobject from the DB.
  //     name: 'arvind',
  //     role: 'admin',
  //     username: 'arvind@myapp.com'
  //   };

  //   return dbUserObj;
  // },
}

// private method
function generateToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, secret());

  return {
    token: token,
    expires: expires
  };
}

function expiresIn(numDays) {
  var date = new Date();
  return date.setDate(date.getDate() + numDays);
}

module.exports = auth;
