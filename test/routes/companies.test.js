/**
 * Companies routes spec
 */

'use strict';

var expect = require('chai').expect;
var request = require('supertest');
var mongoose = require('mongoose');
var app = require('./../../app');
var utils = require('./../utils');
var Company = require('./../../models/Company');
var User = require('./../../models/User');

app.listen(1234);

describe('companies routes', function() {
  var url = 'localhost:1234',
      user = {
        email: 'user@dealbook.co',
        password: 'letmein'
      },
      token = null;

  beforeEach(function(done) {
    User.create(user);

    request(url)
      .post('/login')
      .send(user)
      .end(function(err, res) {
        token = res.body;
        done();
      });
  });

  describe('GET /companies', function() {
    it('returns all companies', function(done) {
      Company.create({ name: 'Magnetis' }, function(err, companies) {
        request(url)
          .get('/api/v1/companies')
          .set('x-access-token', token.token)
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
        .set('x-access-token', token.token)
        .expect(200)
        .expect([], done);
    });
  });

  describe('GET /company/:id', function() {
    it('returns one company', function(done) {
      Company.create({ name: 'Magnetis' }, function(err, company) {
        request(url)
          .get('/api/v1/company/'+ company._id)
          .set('x-access-token', token.token)
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
        .set('x-access-token', token.token)
        .end(function(err, res) {
          expect(res.status).to.eql(404);
          expect(res.body.status).to.eql(404);
          expect(res.body.message).to.eql('Not found');
          done();
        });
    });

    it('returns error if no token is sent', function(done) {
      Company.create({ name: 'Magnetis' }, function(err, company) {
        request(url)
          .get('/api/v1/company/'+ company._id)
          .expect(401)
          .expect({ status: 401, message: 'Authentication failed' }, done);
      });
    });
  });

  describe('POST /companies', function() {
    it('creates new company', function(done) {
      var params = {
        name: 'ContaAzul'
      };

      request(url)
        .post('/api/v1/companies/')
        .set('x-access-token', token.token)
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
        .set('x-access-token', token.token)
        .send({})
        .end(function(err, res) {
          expect(res.status).to.eql(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.message).to.eql('Company validation failed');
          done();
        });
    });

    it('returns error if no token is sent', function(done) {
      request(url)
        .post('/api/v1/companies/')
        .expect(401)
        .expect({ status: 401, message: 'Authentication failed' }, done);
    });
  });

  describe('PUT /company/:id', function() {
    it('updates a company', function(done) {
      var newParams = { name: 'ContaAzul' };

      Company.create({ name: 'Magnetis' }, function(err, company) {
        request(url)
          .put('/api/v1/company/'+ company._id)
          .set('x-access-token', token.token)
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
          .set('x-access-token', token.token)
          .send(newParams)
          .end(function(err, res) {
            expect(res.status).to.eql(400);
            expect(res.body.status).to.eql(400);
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
        .set('x-access-token', token.token)
        .send(newParams)
        .end(function(err, res) {
          expect(res.status).to.eql(404);
          expect(res.body.status).to.eql(404);
          expect(res.body.message).to.eql('Not found');
          done();
        });
    });

    it('returns error if no token is sent', function(done) {
      var newParams = { name: 'ContaAzul' };

      Company.create({ name: 'Magnetis' }, function(err, company) {
        request(url)
          .put('/api/v1/company/'+ company._id)
          .expect(401)
          .expect({ status: 401, message: 'Authentication failed' }, done);
      });
    });
  });

  describe('DELETE /company/:id', function() {
    it('deletes a company', function(done) {
      Company.create({ name: 'Magnetis' }, function(err, company) {
        request(url)
          .delete('/api/v1/company/'+ company._id)
          .set('x-access-token', token.token)
          .end(function(err, res) {
            expect(res.status).to.eql(200);
            expect(res.body.message).to.eql('Company deleted');
            done();
          });
      });
    });

    it('returns error message when company not found', function(done) {
      var id = new mongoose.Types.ObjectId();

      request(url)
        .delete('/api/v1/company/' + id)
        .set('x-access-token', token.token)
        .end(function(err, res) {
          expect(res.status).to.eql(404);
          expect(res.body.status).to.eql(404);
          expect(res.body.message).to.eql('Not found');
          done();
        });
    });

    it('returns error if no token is sent', function(done) {
      Company.create({ name: 'Magnetis' }, function(err, company) {
        request(url)
          .delete('/api/v1/company/'+ company._id)
          .expect(401)
          .expect({ status: 401, message: 'Authentication failed' }, done);
      });
    });
  });
});
