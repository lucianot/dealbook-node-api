/**
 * ValidateRequest middleware spec
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

describe('validateRequest', function() {
  var url = 'localhost:1234',
      user = {
        email: 'user@dealbook.co',
        password: 'letmein'
      },
      token = null;

  beforeEach(function(done) {
    User.create(user);
    Company.create({ name: 'Magnetis' });

    request(url)
      .post('/login')
      .send(user)
      .end(function(err, res) {
        token = res.body;
        done();
      });
  });

  describe('verify authentication', function() {
    it('allows valid token', function(done) {
      request(url)
        .get('/api/v1/companies')
        .set('x-access-token', token.token)
        .end(function(err, res) {
          expect(res.status).to.eql(200);
          expect(res.body[0].name).to.eql('Magnetis');
          done();
        });
    });

    it('returns error if no token is sent', function(done) {
      request(url)
        .get('/api/v1/companies')
        .end(function(err, res) {
          expect(res.status).to.eql(401);
          expect(res.body.status).to.eql(401);
          expect(res.body.message).to.eql('Authentication failed');
          done();
        });
    });

    it('returns error if invalid token is sent', function(done) {
      var invalidToken = 'XYZ' + token.token.slice(3);

      request(url)
        .get('/api/v1/companies')
        .set('x-access-token', invalidToken)
        .end(function(err, res) {
          expect(res.status).to.eql(401);
          expect(res.body.status).to.eql(401);
          expect(res.body.message).to.eql('Authentication failed');
          done();
        });
    });
  });
});
