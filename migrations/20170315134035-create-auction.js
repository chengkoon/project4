'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Auctions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      item: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      retailPrice: {
        type: Sequelize.INTEGER
      },
      minBid: {
        type: Sequelize.INTEGER
      },
      maxBid: {
        type: Sequelize.INTEGER
      },
      charity: {
        type: Sequelize.INTEGER
      },
      hasEnded: {
        type: Sequelize.BOOLEAN
      },
      endDate: {
        type: Sequelize.DATEONLY
      },
      endHour: {
        type: Sequelize.INTEGER
      },
      endMinute: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Auctions');
  }
};