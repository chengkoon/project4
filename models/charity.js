'use strict';
module.exports = function(sequelize, DataTypes) {
  var Charity = sequelize.define('Charity', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    link: DataTypes.STRING,
    donationReceived: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Charity.belongsToMany(models.User, {through: "Donation"})
      }
    }
  });
  return Charity;
};
