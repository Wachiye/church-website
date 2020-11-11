'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ministries', [
      {
        name: "youth and children",
        description:"youth and children spiritual growth and development",
        image:"avatar.jpeg"
      },
      {
        name: "adult",
        description:"adult growth, marriage, counseling",
        image:"avatar.jpeg"
      },
      {
        name: "events",
        description:"event planning and scheduling",
        image:"avatar.jpeg"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ministries', null, {});
  }
};
