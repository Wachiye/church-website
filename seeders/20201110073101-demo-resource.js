'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('resources', [
      {
        title: "Baptism Form",
        description: "Baptism reg form",
        content: "Baptism form",
        type:"form",
        url: "this.form.com",
        image:"form.png"
      },
      {
        title: "My True Love",
        description: "A girl false in love with a stranger",
        content: "A girl loved a stranger",
        type:"story",
        url: "this.story.com",
        image:"story.png"
      },
      {
        title: "Baptism Form",
        description: "Baptism reg form",
        content: "Baptism form",
        type:"form",
        url: "this.form.com",
        image:"form.png"
      }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('resources', null, {});
  }
};
