var mongo = require('mongodb');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/DobaanDB';

mongoose.connect(mongoDB, {
  useNewUrlParser: true
})
//Connect
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));

var registeruserSchema = mongoose.Schema({
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
  listings: [{
    listing_id: {
      type: String
    },
    listing_title: {
      type: String
    },
    listing_price: {
      type: String
    },
    image:{
      type: String
    }
  }]
});
var Registeruser = module.exports = mongoose.model('registerusers', registeruserSchema)

module.exports.getRegisterusersByUserName = function(username, callback) {
  var query = {
    username: username
  }
  Registeruser.findOne(query, callback);
}
module.exports.register = function(info, callback) {
  registeruser_user=info["registeruser_user"];
  listing_id=info["listing_id"];
  listing_title=info["listing_title"];
  listing_price=info["listing_price"];
  image=info["image"];
  var query = {
      username: registeruser_user
  }
  Registeruser.findOneAndUpdate(
    query,{
      $push:{
        "listings":{
          listing_id : listing_id,
          listing_title : listing_title,
          listing_price : listing_price,
          image : image
        }
      }
    },{
      safe:true,
      upsert:true
    },callback)
}
module.exports.geteditListingById=function(id,callback){
  var query = {
    _id: id
  }
Registeruser.findOne(query, callback);
}

