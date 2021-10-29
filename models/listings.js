const mongo=require('mongodb');
const mongoose=require('mongoose');
const mongoDB = 'mongodb://localhost:27017/DobaanDB';

mongoose.connect(mongoDB, {
  useNewUrlParser: true
})
const Schema = mongoose.Schema
//Connect
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));

const listingSchema=mongoose.Schema({
    listing_id:{
      type:String
      /*type:Schema.ObjectId*/
    },
    listing_title:{
      type:String,
      required: true
    },
    projectname:{
      type:String,
      required: true
    },
    registeruser:{
      type:String
    },
    listing_price:{
      type:String,
      required: true
    },
    sizeroom:{
      type:String,
      required: true
    },
    floor:{
      type:String,
      required: true
    },
    roomtype:{
      type:String,
      required: true
    },
    bathroom:{
      type:String,
      required: true
    },
    image:{
      type:String,
      required: true
    },
    description:{
      type:String,
      required: true
    }
});
var Listings=module.exports=mongoose.model('listings',listingSchema)

module.exports.createListing=function(data,callback){
  data.save(callback)
}
module.exports.getListingID=function(listing_id,callback){
  var query={
    listing_id:listing_id
  }
  Listings.findOne(query,callback);
}

module.exports.getListings=function(callback,limit){
    Listings.find(callback).limit(limit)
}

/*module.exports.findById=function(id,callback){
  return Listings.filter(id);
}*/
module.exports.getListingById = function(listing_id, callback) {  
  Listings.findById(listing_id, callback);
}
/*
module.exports.deleteListings=function(id,callback){
  Listings.findByIdAndDelete(id, callback);
}*/


