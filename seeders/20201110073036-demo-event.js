'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('events', [
      {
        title:"Wedding",
        description:"user1 and user2 are tying the knot",
        from: new Date(),
        to : new Date() + 24 * 60 * 60 * 1000,
        image: "avatar.jpg"
      },
      {
        title:"Church donation",
        description:"Harambee for church expansion. Estimated amount 1M. Welcome",
        from: new Date(),
        to : new Date() + 24 * 60 * 60 * 1000,
        image: "avatar.jpg"
      },
      {
        title:"Wedding",
        description:"user1 and user2 are tying the knot",
        from: new Date(),
        to : new Date() + 24 * 60 * 60 * 1000,
        image: "avatar.jpg"
      }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('events', null, {});
  }
};
