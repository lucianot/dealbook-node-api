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
        res.status(404);
        res.json({
          status: 404,
          message: 'Not found'
        });
      }
    });
  },

  create: function(req, res) {
    Company.create(req.body, function(err, company) {
      if (err) {
        res.status(400);
        res.json({
          status: 400,
          message: 'Company validation failed',
          error: err
        });
      }

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
          // Update error
          res.status(400)
            .json({
              status: 400,
              message: 'Validation failed',
              error: err
            });
        } else if (company) {
          // Update successful
          res.status(200)
            .json(company);
        } else {
          // Company not found
          res.status(404)
            .json({
              status: 404,
              message: 'Not found'
            });
        }
    });
  },

  deleteOne: function(req, res) {
    Company.findOneAndRemove(req.params.id, function(err, company) {
      if (err)
        res.send(err);

      if (company) {
        res.status(200)
          .json({
            status: 200,
            message: 'Company deleted'
          });
      } else {
        res.status(404)
          .json({
            status: 404,
            message: 'Not found'
          });
      }
    });
  }
}

module.exports = companies;
