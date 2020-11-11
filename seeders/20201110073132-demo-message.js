'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('messages', [
      {
        name:"person 1",
        email:"person1@domain.com",
        phone: "07xx-xxx-xxx5",
        message:"this is a message"
      },
      {
        name:"person 1",
        email:"person1@domain.com",
        phone: "07xx-xxx-xxx5",
        message:"this is another message from person 1"
      },
      {
        name:"person 2",
        email:"person2@domain.com",
        phone: "07xx-xxx-xxx6",
        message:"this is a different person"
      },
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('messages', null, {});

  }
};
