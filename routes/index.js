var express = require('express');
var router = express.Router();
var csrf = require('csurf');
//pasport
var passport = require('passport');
//product
var Product = require('../models/product');
//csrf token protected
var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. semacam controller nanti index.js akan di execute di file .hbs*/
router.get('/', function(req, res, next) {
  Product.find(function(err, docs){
    var productChunks = [];
    var chunksSize = 3;

    for(var i =0; i<docs.length; i += chunksSize){
      productChunks.push(docs.slice(i, i + chunksSize));
    }
    res.render('shop/index', {title: 'Shopping Cart', products: productChunks});
  });
});

/* GET signup Pages*/
router.get('/user/signup', function( req, res, next){
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

/*POST signup new user by email valid dan by password*/
router.post('/user/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

router.get('/user/profile', function(req, res, next){
  res.render('user/profile');
});

module.exports = router;
