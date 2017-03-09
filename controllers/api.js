var db = require('../models');
var passport = require('../config/ppConfig');
var express = require('express');
var apiRoutes = express.Router();

apiRoutes.get('/admin', (req, res) => {
  res.json({ admin: req.user.admin });
});

apiRoutes.post('/admin/auction', (req, res) => {
  console.log("post req received...........",req.body);
  db.Auction.create(req.body)
  .spread(function(auction, created) {
    console.log('AUCTION IS CREATED!!!', auction.values);
  })
})

apiRoutes.get('/auctions', (req, res) => {
  console.log('getting all auctions...........');
  db.Auction.findAll({
    hasEnded: false
  })
  .then((auctions) => {
    res.json({ auctions: auctions })
  })
})

apiRoutes.get('/user', (req, res) => {
  console.log("user balance req received........");
  db.User.find({
    id: req.user.id
  })
  .then((user) => {
    res.json({ user: user })
  })
})












module.exports = apiRoutes;
