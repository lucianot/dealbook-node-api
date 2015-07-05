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
          .expect(200)
          .end(function(err, res) {
            expect(res.body.length).to.eql(1);
            expect(res.body[0].name).to.eql('Magnetis');
            done();
          });
      });
    });

    it('returns empty array when no companies', function(done) {
      request(url)
        .get('/api/v1/companies')
        .expect(200)
        .expect([], done);
    });
  });

  describe('GET /companies/:id', function() {
    it('returns one company', function(done) {
      Company.create({ name: 'Magnetis' }, function(err, company) {
        request(url)
          .get('/api/v1/company/'+ company._id)
          .expect(200)
          .end(function(err, res) {
            expect(res.body.name).to.eql('Magnetis');
            done();
          });
      });
    });

    it('returns empty when company not found', function(done) {
      var id = new mongoose.Types.ObjectId();

      request(url)
        .get('/api/v1/company/' + id)
        .expect(200)
        .expect('', done);
    });
  });

  describe('POST /companies', function() {
    it('creates new company', function(done) {
      var params = {
        name: 'ContaAzul'
      };

      request(url)
        .post('/api/v1/companies/')
        .send(params)
        .expect(200)
        .end(function(err, res) {
          expect(res.body.name).to.eql(params.name);
          done();
        });
    });

    it('returns error message when company not created', function(done) {
      request(url)
        .post('/api/v1/companies/')
        .send({})
        .expect(200)
        .end(function(err, res) {
          expect(res.body.message).to.eql('Company validation failed');
          done();
        });
    });
  });
});
