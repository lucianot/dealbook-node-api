/**
 * Routes spec
 */

'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;
var request = require('supertest');
var mongoose = require('mongoose');
var app = require('./../app');
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
        .expect(200)
        .expect([], done);
    });
  });

  describe('GET /company/:id', function() {
    it('returns one company', function(done) {
      Company.create({ name: 'Magnetis' }, function(err, company) {
        request(url)
          .get('/api/v1/company/'+ company._id)
          .end(function(err, res) {
            expect(res.status).to.eql(200);
            expect(res.body.name).to.eql('Magnetis');
            done();
          });
      });
    });

    it('returns error message when company not found', function(done) {
      var id = new mongoose.Types.ObjectId();

      request(url)
        .get('/api/v1/company/' + id)
        .expect(404)
        .expect('Not found!', done);
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
        .end(function(err, res) {
          expect(res.status).to.eql(200);
          expect(res.body.name).to.eql(params.name);
          done();
        });
    });

    it('returns error message when company not created', function(done) {
      request(url)
        .post('/api/v1/companies/')
        .send({})
        .end(function(err, res) {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.eql('Company validation failed');
          done();
        });
    });
  });

  describe('PUT /company/:id', function() {
    it('updates a company', function(done) {
      var newParams = { name: 'ContaAzul' };

      Company.create({ name: 'Magnetis' }, function(err, company) {
        request(url)
          .put('/api/v1/company/'+ company._id)
          .send(newParams)
          .end(function(err, res) {
            expect(res.status).to.eql(200)
            expect(res.body.name).to.eql(newParams.name);
            done();
          });
      });
    });

    it('returns error message when company not updated', function(done) {
      var newParams = { name: '' };

      Company.create({ name: 'Magnetis' }, function(err, company) {
        request(url)
          .put('/api/v1/company/'+ company._id)
          .send(newParams)
          .end(function(err, res) {
            expect(res.status).to.eql(400);
            expect(res.body.message).to.eql('Validation failed');
            done();
          });
      });
    });

    it('returns error message when company not found', function(done) {
      var id = new mongoose.Types.ObjectId(),
          newParams = { name: 'ContaAzul' };

      request(url)
        .put('/api/v1/company/' + id)
        .send(newParams)
        .expect(404)
        .expect('Not found!', done);
    });
  });

  describe('DELETE /company/:id', function() {
    it('updates a company', function(done) {
      Company.create({ name: 'Magnetis' }, function(err, company) {
        request(url)
          .delete('/api/v1/company/'+ company._id)
          .expect(200)
          .expect('Company deleted', done);
      });
    });

    it('returns error message when company not found', function(done) {
      var id = new mongoose.Types.ObjectId();

      request(url)
        .delete('/api/v1/company/' + id)
        .expect(404)
        .expect('Not found!', done);
    });
  });
});
