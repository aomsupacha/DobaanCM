var mongo = require('mongodb');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/DobaanDB';

mongoose.connect(mongoDB, {
  useNewUrlParser: true
})
//Connect
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));

var aminSchema = mongoose.Schema({
  username: {
    type: String
  },
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  email: {
    type: String
  },
});
var Amin = module.exports = mongoose.model('amins', aminSchema)

module.exports.getAminsByUserName = function(username, callback) {
  var query = {
    username: username
  }
  Amin.findOne(query, callback);
}

