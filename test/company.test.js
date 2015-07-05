'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;
var utils = require('./utils');
var Company = require('./../models/Company');
// mongoose.connect('mongodb://localhost/dealbook-node-api_test');

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
      expect(err).not.to.be.null;
      done();
    });
  });
});
