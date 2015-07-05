var express = require('express');
var router = express.Router();
var Company = require('./../models/Company');

router.get('/api/v1/companies', getAll);

function getAll(req, res) {
  Company.find(function(err, companies) {
    if (err)
      res.send(err);

    res.json(companies);
  });
}

module.exports = router;
