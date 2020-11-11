'use strict';

const { hashSync } = require("bcrypt");

require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('users', [
        {
          username:"user1",
          first_name:"user1",
          last_name: "user1",
          email: "user1@domain.com",
          phone:"07xx-xxx-xxx1",
          dob: new Date(),
          age: 21,
          address:"232, Kitale",
          gender: "male",
          type: "visitor",
          role: "member",
          image: "avatar.jpg",
          password: hashSync("user1",8)
        },
        {
          username:"user2",
          first_name:"user2",
          last_name: "user2",
          email: "user2@domain.com",
          phone:"07xx-xxx-xxx2",
          dob: new Date(),
          age: 34,
          address:"232, Kitale",
          gender: "female",
          type: "member",
          role: "member",
          image: "avatar.jpg",
          password: hashSync("user2",8)
        },
        {
          username:"user3",
          first_name:"user3",
          last_name: "user3",
          email: "user3@domain.com",
          phone:"07xx-xxx-xxx3",
          dob: new Date(),
          age: 21,
          address:"232, Kitale",
          gender: "male",
          type: "staff",
          role: "leader",
          image: "avatar.jpg",
          password: hashSync("user3",8)
        }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
