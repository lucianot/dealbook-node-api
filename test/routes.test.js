/**
 * Routes spec
 */

'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;
var request = require('supertest');
var mongoose = require('mongoose');
var app = require('./../index');
var utils = require('./utils');
var Company = require('./../models/Company');

app.listen(1234);

describe('routes', function() {
  var url = 'localhost:1234';

  describe('GET /companies', function() {
    it('returns all companies', function(done) {
      Company.create({ name: 'Magnetis' }, function(err, companies) {
        request(url)
          .get('/api/v1/companies')
          .end(function(err, res) {
            if (err) {
              throw err;
            }
            expect(res.status).to.eql(200);
            expect(res.body.length).to.eql(1);
            expect(res.body[0].name).to.eql('Magnetis');
            done();
          });
      });
    });

    it('returns empty array when no companies', function(done) {
      request(url)
        .get('/api/v1/companies')
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          expect(res.status).to.eql(200);
          expect(res.body.length).to.eql(0);
          expect(res.body).to.eql([]);
          done();
        });
    });
  });

  describe('GET /companies/:id', function() {
    it('returns one company', function(done) {
      Company.create({ name: 'Magnetis' }, function(err, company) {
        request(url)
          .get('/api/v1/company/'+ company._id)
          .end(function(err, res) {
            if (err) {
              throw err;
            }
            expect(res.status).to.eql(200);
            expect(res.body.name).to.eql('Magnetis');
            done();
          });
      });
    });

    it('returns empty when company not found', function(done) {
      var id = new mongoose.Types.ObjectId();

      request(url)
        .get('/api/v1/company/' + id)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          expect(res.status).to.eql(200);
          expect(res.body).to.be.empty;
          done();
        });
    });
  });
});
