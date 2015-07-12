/**
 * User model
 */

'use strict';

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: Boolean
});

module.exports = mongoose.model('User', UserSchema);
