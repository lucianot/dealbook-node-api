/**
 * Auth actions
 */

'use strict';

var jwt = require('jwt-simple');
var secret = require('../config/secret.js');
// var validateUser = require('../routes/auth').validateUser;

module.exports = function(req, res, next) {

  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if our the app
  // is safe.

  // We skip the token outh for [OPTIONS] requests.
  // if(req.method == 'OPTIONS') next();

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

  if (token || key) {
    try {
      var decoded = jwt.decode(token, secret());

      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          status: 400,
          message: 'Token Expired'
        });
        return;
      }

      next();

      // // Authorize the user to see if s/he can access our resources

      // var dbUser = validateUser(key); // The key would be the logged in user's username
      // if (dbUser) {

      //   if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
      //     next(); // To move to next middleware
      //   } else {
      //     res.status(403);
      //     res.json({
      //       "status": 403,
      //       "message": "Not Authorized"
      //     });
      //     return;
      //   }
      // } else {
      //   // No user with this name exists, respond back with a 401
      //   res.status(401);
      //   res.json({
      //     "status": 401,
      //     "message": "Invalid User"
      //   });
      //   return;
      // }

    } catch (err) {
      // If token is invalid, respond back with 500
      res.status(500);
      res.json({
        status: 500,
        message: 'Oops something went wrong',
        error: err
      });
    }
  } else {
    // If no token or key is sent, respond back with 401
    res.status(401);
    res.json({
      status: 401,
      message: 'Invalid Token or Key'
    });
    return;
  }
};
