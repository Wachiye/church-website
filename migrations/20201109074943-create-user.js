'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      gender: {
        type: Sequelize.ENUM("male", "female"),
        allowNull: false
      },
      dob:{
        type: Sequelize.DATE,
        allowNull: false
      },
      age: {
          type: Sequelize.INTEGER,
          defaultValue: 1
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      type: {
        type: Sequelize.ENUM("visitor","member","staff"),
        allowNull: false,
        defaultValue: "visitor"
      },
      role: {
        type: Sequelize.ENUM("member","leader"),
        allowNull: false,
        defaultValue: "member"
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      // church_id : {
      //   type: Sequelize.UUID,
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      //   references: {
      //     model: "churches",
      //     key: "id"
      //   }
      // },
      // ministry_id : {
      //   type: Sequelize.UUID,
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      //   references: {
      //     model: "ministries",
      //     key: "id"
      //   }
      // },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};