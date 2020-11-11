'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('donations', [
      {
        transaction_id:"3ff80011200",
        amount: 500.00,
        type:"offering",
        purpose:"offering"
      }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('donations', null, {});
    
  }
};
