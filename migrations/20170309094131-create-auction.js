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
      charity01: {
        type: Sequelize.INTEGER
      },
      charity02: {
        type: Sequelize.INTEGER
      },
      charity03: {
        type: Sequelize.INTEGER
      },
      endDate: {
        type: Sequelize.DATE
      },
      endTime: {
        type: Sequelize.TIME
      },
      hasEnded: {
        type: Sequelize.BOOLEAN
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
