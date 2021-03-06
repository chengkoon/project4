'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Auctions');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Auctions', {
      item: DataTypes.STRING,
      description: DataTypes.TEXT,
      retailPrice: DataTypes.INTEGER,
      minBid: DataTypes.INTEGER,
      maxBid: DataTypes.INTEGER,
      charity: DataTypes.INTEGER,
      hasEnded: DataTypes.BOOLEAN,
      endDate: DataTypes.DATEONLY,
      endTime: DataTypes.TIME,
      combinedEndDateTime: DataTypes.DATE
    })
  }
};
