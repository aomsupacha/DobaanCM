var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Listings = require('../models/listings')
var Registeruser = require('../models/registerusers')

router.get('/indexdashboard', function(req, res, next) {
    Registeruser.getRegisterusersByUserName(req.user.username ,function(err,registeruser){
        res.render('registerusers/indexdashboard',{registeruser:registeruser});
     });
  });   
router.get('/add', function(req, res, next) {
    Registeruser.getRegisterusersByUserName(req.user.username ,function(err,registeruser){
      res.render('registerusers/addListing',{registeruser:registeruser});
   });
});   

router.get('/edit/:id', function(req, res, next) {
   
   Registeruser.geteditListingById([req.params.id], function(err,listing){
     if(err) throw err
     res.render("registerusers/editForm",{listing:listing});
   });
   Registeruser.getRegisterusersByUserName(req.user.username ,function(err,registeruser){
      res.render('registerusers/addListing',{registeruser:registeruser});
   });
   
   //res.render('registerusers/addListing');
 });    

module.exports = router;