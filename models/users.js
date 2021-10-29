// Model
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const mongoDB = 'mongodb://localhost:27017/DobaanDB';

mongoose.connect(mongoDB, {
  useNewUrlParser: true
})
//Connect
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));

// Create Schema
var userSchema = mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  type: {
    type: String
  }
});

var User = module.exports = mongoose.model('users', userSchema);

module.exports.saveAmin = function(newUser, newAmin, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
          newUser.password=hash;
          newUser.save(callback);
          newAmin.save(callback);
    });
  });
}
module.exports.saveRegisteruser = function(newUser, newRegisteruser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
          newUser.password=hash;
          newUser.save(callback);
          newRegisteruser.save(callback);
    });
  });
}

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}
module.exports.getUserByName = function(username, callback) {
  var query = {
    username: username
  };
  User.findOne(query, callback);
}

module.exports.comparePassword = function(password, hash, callback) {
  bcrypt.compare(password, hash, function(err, isMatch) {
        callback(null, isMatch);
  });
}
