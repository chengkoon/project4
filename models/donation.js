'use strict';
module.exports = function(sequelize, DataTypes) {
  var Donation = sequelize.define('Donation', {
    userId: DataTypes.INTEGER,
    charityId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Donation;
};