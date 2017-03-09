'use strict';
module.exports = function(sequelize, DataTypes) {
  var Auction = sequelize.define('Auction', {
    item: DataTypes.STRING,
    description: DataTypes.TEXT,
    retailPrice: DataTypes.INTEGER,
    minBid: DataTypes.INTEGER,
    maxBid: DataTypes.INTEGER,
    charity01: DataTypes.INTEGER,
    charity02: DataTypes.INTEGER,
    charity03: DataTypes.INTEGER,
    endDate: DataTypes.DATE,
    endTime: DataTypes.TIME,
    hasEnded: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Auction.belongsToMany(models.User, {through: "Bid"})
      }
    }
  });
  return Auction;
};
