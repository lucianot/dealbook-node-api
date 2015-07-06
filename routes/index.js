/**
 * Routes
 */

'use strict';

var express = require('express');
var router = express.Router();
var companies = require('./companies');

router.get('/api/v1/companies', companies.getAll);
router.get('/api/v1/company/:id', companies.getOne);
router.post('/api/v1/companies', companies.create);
router.put('/api/v1/company/:id', companies.update);
router.delete('/api/v1/company/:id', companies.deleteOne);

module.exports = router;
