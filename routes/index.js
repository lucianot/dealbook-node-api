var express = require('express');
var router = express.Router();
var Company = require('./../models/Company');

router.get('/api/v1/companies', getAll);
router.get('/api/v1/company/:id', getOne);

function getAll(req, res) {
  Company.find(function(err, companies) {
    if (err)
      res.send(err);

    res.json(companies);
  });
}

function getOne(req, res) {
  Company.findById(req.params.id, function(err, company) {
    if (err)
      res.send(err);

    if (company) {
      res.json(company);
    } else {
      res.json();
    }
  });
}

module.exports = router;
