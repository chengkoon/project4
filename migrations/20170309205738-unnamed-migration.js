'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Bids');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Bids');
  }
};
