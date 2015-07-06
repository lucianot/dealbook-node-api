var express = require('express');
var router = express.Router();
var Company = require('./../models/Company');

router.get('/api/v1/companies', getAll);
router.get('/api/v1/company/:id', getOne);
router.post('/api/v1/companies', create);
router.put('/api/v1/company/:id', update);
router.delete('/api/v1/company/:id', deleteOne);

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
      res
        .status(404)
        .send('Not found!');
    }
  });
}

function create(req, res) {
  Company.create(req.body, function(err, company) {
    if (err)
      res.status(400).send(err);

    if (company) {
      res.json(company);
    }
  });
}

function update(req, res) {
  Company.findOneAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true, runValidators: true },
    function(err, company) {
      if (err) {
        res.status(400).send(err); // Update error
      } else if (company) {
        res.status(200).json(company); // Update successful
      } else {
        res.status(404).send('Not found!'); // Company not found
      }
  });
}

function deleteOne(req, res) {
  Company.findOneAndRemove(req.params.id, function(err, company) {
    if (err)
      res.send(err);

    if (company) {
      res.status(200).send('Company deleted');
    } else {
      res.status(404).send('Not found!');
    }
  });
}
module.exports = router;
