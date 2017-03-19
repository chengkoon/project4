'use strict';
module.exports = function(sequelize, DataTypes) {
  var Auction = sequelize.define('Auction', {
    item: DataTypes.STRING,
    description: DataTypes.TEXT,
    retailPrice: DataTypes.INTEGER,
    minBid: DataTypes.INTEGER,
    maxBid: DataTypes.INTEGER,
    charity: DataTypes.INTEGER,
    hasEnded: DataTypes.BOOLEAN,
    endDate: DataTypes.DATEONLY,
    endHour: DataTypes.INTEGER,
    endMinute: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Auction;
};