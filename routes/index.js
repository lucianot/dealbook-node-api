/**
 * Routes
 */

'use strict';

var express = require('express');
var router = express.Router();

var auth = require('./auth');
var companies = require('./companies');
// var user = require('./users.js');

/*
 * Routes that can be accessed by anyone
 */
router.get('/', function(req, res) {
    res.send('Hello! Welcome to the Dealbook API!');
});
router.post('/login', auth.login);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/companies', companies.getAll);
router.get('/api/v1/company/:id', companies.getOne);
router.post('/api/v1/companies', companies.create);
router.put('/api/v1/company/:id', companies.update);
router.delete('/api/v1/company/:id', companies.deleteOne);

module.exports = router;
