var should     = require('should');
var serialize  = require('../index');
var middleware = serialize.middleware;

var biscuit = {
  name: 'Biscuit',
  age: 10,
  breed: 'mutt',
  serialize: function() {
    return this.name + ' is a ' + this.age + ' year old ' + this.breed + '.';
  }
};

var chris = {
  email: 'chris@cjroth.com',
  firstName: 'Chris',
  lastName: 'Roth',
  password: 'a terrible password',
  pet: biscuit,
  serialize: function() {
    return {
      email: this.email,
      name: this.firstName + ' ' + this.lastName,
      pet: biscuit
    };
  }
};

var serializedChris = serialize(chris);

describe('serialize', function() {

  it('Should call the serialize method on an object.', function() {
    serializedChris.should.have.properties({
      email: 'chris@cjroth.com',
      name: 'Chris Roth'
    });
    serializedChris.should.not.have.property('password');
  });

  it('Should recursively call the serialize method on an object\'s properties.', function() {
    serializedChris.pet.should.equal('Biscuit is a 10 year old mutt.');
  });

});

describe('middleware', function() {

  it('Should pass serialized data to res.json when the serialization is an object.', function(done) {
    var req = {};
    var res = {
      json: function(data) {
        serializedChris.should.have.property('name', 'Chris Roth');
        done();
      }
    };
    var next = function() {
      res.serialize(chris);
    };
    middleware(req, res, next);
  });

  it('Should pass serialized data to res.send when the serialization is a string.', function(done) {
    var req = {};
    var res = {
      send: function(data) {
        data.should.equal('Biscuit is a 10 year old mutt.');
        done();
      }
    };
    var next = function() {
      res.serialize(biscuit);
    };
    middleware(req, res, next);
  });

});