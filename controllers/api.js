const db = require('../models');
const passport = require('../config/ppConfig');
const express = require('express');
const apiRoutes = express.Router();

apiRoutes.get('/admin', (req, res) => {
  res.json({ admin: req.user.admin });
});

apiRoutes.post('/admin/auction', (req, res) => {
  console.log("post req received...........",req.body);
  db.Auction.create(req.body)
  .spread(function(auction, created) {
    console.log('AUCTION IS CREATED!!!', auction.values);
  })
});

apiRoutes.get('/auctions', (req, res) => {
  // console.log('getting all auctions...........');
  db.Auction.findOne(
    { where: { hasEnded: false} }
  )
  .then((auction) => {
    res.json({ auction: auction })
  })
});

apiRoutes.put('/auctions', (req, res) => {
  db.Auction.update(
    { hasEnded: true },
    { where: { hasEnded: false} }
  )
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
  })
});

apiRoutes.get('/auctionsCompleted', (req, res) => {
  // console.log('getting all auctions...........');
  db.Auction.findAll(
    { where: { hasEnded: true } }
  )
  .then((auctions) => {
    res.json({ auctions: auctions })
  })
});

apiRoutes.get('/user', (req, res) => {
  // console.log("current logged in user is ", req.user.id);
  db.User.findById(req.user.id)
  .then((user) => {
    // console.log("found user is...", user);
    res.json({ user: user })
  })
});

apiRoutes.put('/user/balance', (req, res) => {
  console.log("user balance edit req received......", req.body);
  db.User.update(
    { balance: req.body.topup },
    { where: { id: req.user.id } }
  )
  .then((result) => {
    console.log("about to res.json(result)......");
    res.json(result);
  })
  .catch((error) => {
  })
});

apiRoutes.post('/user/bid', (req, res) => {
  console.log("user bid post req received.......", req.body);
  db.Bid.create({
    userId: req.user.id,
    auctionId: req.body.auctionId,
    charity: req.body.charity,
    amount: req.body.amount
  })
  .then(function(bid) {
    console.log('Bid is created!!!', bid.values);
    res.json(bid);
  })
  console.log("now toggling user's hasPlacedBid");
  db.User.update(
    { hasPlacedBid: true },
    { where: { id: req.user.id } }
  )
  .then((result) => {
    console.log("user's hasPlacedBid has been toggled to true");
    res.json(result);
  })
});

apiRoutes.put('/user/clearBid', (req, res) => {
  console.log("reduce countdown put req received......", req.body);
  db.User.update(
    { hasPlacedBid: false },
    { where: { id: req.user.id } }
  )
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
  })
});

apiRoutes.post('/bid/findWinner', (req, res) => {
  // console.log("current logged in user is ", req.user.id);
  db.Bid.findAll(
    { where: { auctionId: req.body.auctionId } }
  )
  .then((bids) => {
    console.log("found bids are...", bids);
    res.json({ bids: bids })
  })
});

apiRoutes.post('/winner', (req, res) => {
  // console.log("current logged in user is ", req.user.id);
  console.log("WINNER request...", req.body);
  db.User.findById(req.body.winnerId)
  .then((user) => {
    // console.log("found user is...", user);
    res.json({ user: user })
  })
});










module.exports = apiRoutes;
