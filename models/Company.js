/**
 * Company model
 */

'use strict';

var mongoose = require('mongoose');

var CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('Company', CompanySchema);
