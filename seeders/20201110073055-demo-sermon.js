'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('sermons', [
      {
        title: "Trusting God",
        description: "Nothing makes you firm as christian like trusting in God",
        verse:"John:00:00-00",
        content:"this is the content"
      },
      {
        title: "Trusting God",
        description: "Nothing makes you firm as christian like trusting in God",
        verse:"John:00:00-00",
        content:"<p>We trust in God</p>"
      },
      {
        title: "Trusting God",
        description: "Nothing makes you firm as christian like trusting in God",
        verse:"John:00:00-00",
        content:"this is the content"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sermons', null, {});
    
  }
};
