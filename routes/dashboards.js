var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Listings = require('../models/listings')
var Registeruser = require('../models/registerusers')
//var listts = Listings.find({});
const multer = require('multer');
const { param } = require('.');



/*router.get('/add', function(req, res, next) {
  Registeruser.getRegisterusersByUserName(req.user.username ,function(err,registeruser){
    res.render('registerusers/indexdashboard',{registeruser:registeruser});
 });
});   */
/*router.get('/', function(req, res, next) {
     Listings.getListings(function(err,listings){
       if(err) throw err
       res.render("index", {listings:listings})
     });
});  */

//image upload
var storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null, "./public/uploads");
  }, 
  filename:function(req,file,cb){
    cb(null, file.fieldname + "_" +  Date.now() + "_" + file.originalname);
  },
});
var upload = multer({
  storage:storage,
}).single("image");   

router.post('/add', upload, (req,res,next)=> {
  var listing_id=req.body.listing_id;
  var listing_title=req.body.listing_title;
  var projectname=req.body.projectname;
  var description=req.body.description;
  var registeruser=req.body.registeruser;
  var image=req.file.filename;
  var listing_price=req.body.listing_price;
  var phone=req.body.phone;
  var sizeroom=req.body.sizeroom;
  var floor=req.body.floor;
  var roomtype=req.body.roomtype;
  var bathroom=req.body.bathroom;
  var data=new Listings({
    sizeroom:sizeroom,
    floor:floor,
    roomtype:roomtype,
    bathroom:bathroom,
    listing_id:listing_id,
    listing_title:listing_title,
    projectname:projectname,
    description:description,
    registeruser:registeruser,
    image:image,
    phone:phone,
    listing_price:listing_price
  })
/*
  var data=new Listings({
    listing_title: req.body.listing_title,
    projectname: req.body.projectname,
    price: req.body.price,
    listing_id: req.body.listing_id,
    registeruser:req.body.registeruser,
    phone:req.body.phone,
    image:req.file.filename, 
    description: req.body.description
  }); */

  info=[];
  info["registeruser_user"]=req.user.username;
  info["listing_id"]=listing_id;
  info["listing_title"]=listing_title;
  info["listing_price"]=listing_price;
  info["image"]=image;
  Listings.createListing(data,function(err,callback){
    if(err) console.log(err);
  });
  Registeruser.register(info,function(err,registeruser){
    if(err) console.log(err);
  });  
  res.location('/');
  res.redirect('/');
});

 

router.get('/add', function(req, res, next) {
  res.render('registerusers/addListing');
});    
router.get('/:id',function(req,res,next){
  Listings.getListingById([req.params.id],function(err,listinged){
         res.render('listings/viewlisting',{listinged:listinged})
  });
});



module.exports = router;
