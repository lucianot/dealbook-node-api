/**
 * User model spec
 */

'use strict';

var expect = require('chai').expect;
var utils = require('./../utils');
var User = require('./../../models/User');

describe('User', function() {
  it('must have an email', function(done) {
    User.create({ email: 'admin@dealbook.co', password: '1234' }, function(err, user) {
      expect(err).to.be.null;
      expect(user.email).to.eql('admin@dealbook.co');
      done();
    });
  });

  it('throws error if has no name', function(done) {
    User.create({ password: '1234' }, function(err, user) {
      expect(err.errors.email.message).to.eql('Path `email` is required.');
      done();
    });
  });

  it('must have a password', function(done) {
    User.create({ email: 'admin@dealbook.co', password: '1234' }, function(err, user) {
      expect(err).to.be.null;
      expect(user.password).to.eql('1234');
      done();
    });
  });

  it('throws error if has no password', function(done) {
    User.create({ email: 'admin@dealbook.co' }, function(err, user) {
      expect(err.errors.password.message).to.eql('Path `password` is required.');
      done();
    });
  });
});
