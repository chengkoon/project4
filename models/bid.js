'use strict';
module.exports = function(sequelize, DataTypes) {
  var Bid = sequelize.define('Bid', {
    userId: DataTypes.INTEGER,
    auctionId: DataTypes.INTEGER,
    charity: DataTypes.INTEGER,
    amount: DataTypes.STRING,
    hasCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Bid;
};
