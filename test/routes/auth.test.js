/**
 * Authentication routes spec
 */

'use strict';

var expect = require('chai').expect;
var request = require('supertest');
var mongoose = require('mongoose');
var app = require('./../../app');
var utils = require('./../utils');
var User = require('./../../models/User');

app.listen(1234);

describe('login routes', function() {
  var url = 'localhost:1234';

  describe('POST /login', function() {
    it('returns auth token', function(done) {
      var user = {
        email: 'admin@example.com',
        password: 'letmein'
      };

      User.create(user);
      request(url)
        .post('/login')
        .send(user)
        .end(function(err, res) {
          expect(res.status).to.eql(200);
          expect(res.body).to.have.all.keys('token', 'expires');
          done();
        });
    });

    it('returns error when user not found', function(done) {
      var user = {
        email: 'missing@example.com',
        password: 'letmein'
      };

      request(url)
        .post('/login')
        .send(user)
        .expect(401)
        .expect('Invalid credentials', done);
    });

    it('returns error when password is empty', function(done) {
      var user = {
        email: 'missing@example.com',
        password: ''
      };

      request(url)
        .post('/login')
        .send(user)
        .expect(401)
        .expect('Invalid credentials', done);
    });
  });
});
