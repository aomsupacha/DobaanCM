var express = require('express');
var router = express.Router();
var Listings=require('../models/listings')
var Registeruser = require('../models/registerusers')

/* GET home page. */
router.get('/search/', function(req, res, next) {
  data=new Listings({
    listing_title : req.body.listing_title,
    projectname : req.body.projectname,
    listing_price : req.body.listing_price,
    description : req.body.description,
    image : req.body.filename, 
  })
  var projectname = req.query.projectname;
  
  if(projectname){
    Listings.find({projectname : projectname}, {}, function(err, data) {
        res.render('showSearch', {
          data: data,
          search:projectname
        });
    });
  }
});

module.exports = router;
