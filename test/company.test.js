/**
 * Company model spec
 */

'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;
var utils = require('./utils');
var Company = require('./../models/Company');

describe('Company', function() {
  it('must have a name', function(done) {
    Company.create({ name: 'Magnetis' }, function(err, company) {
      expect(err).to.be.null;
      expect(company.name).to.eql('Magnetis');
      done();
    });
  });

  it('throws error if has no name', function(done) {
    Company.create({}, function(err, company) {
      expect(err.errors.name.message).to.eql('Path `name` is required.');
      done();
    });
  });
});
