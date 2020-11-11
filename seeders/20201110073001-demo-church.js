'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('churches', [
      {
        name:"Only one Church",
        tag: "We trust God",
        email: "church@domain.com",
        phone: "07xx-xxx-xxx4",
        image: "avatar.jpg"
      }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('churches', null, {});
  }
};
