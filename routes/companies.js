/**
 * Companies actions
 */

'use strict';

var Company = require('./../models/Company');

var companies = {
  getAll: function(req, res) {
    Company.find(function(err, companies) {
      if (err)
        res.send(err);

      res.json(companies);
    });
  },

  getOne: function(req, res) {
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
  },

  create: function(req, res) {
    Company.create(req.body, function(err, company) {
      if (err)
        res.status(400).send(err);

      if (company) {
        res.json(company);
      }
    });
  },

  update: function(req, res) {
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
  },

  deleteOne: function(req, res) {
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
}

module.exports = companies;
