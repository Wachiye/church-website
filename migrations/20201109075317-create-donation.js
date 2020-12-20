'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('donations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      user_id : {
        type: Sequelize.UUID,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "users",
          key: "id"
        }
      },
      type:{
        type: Sequelize.ENUM("offering","tithing","donation"),
        allowNull: false,
        defaultValue: "offering"
      },
      purpose: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      transaction_id:{
        type: Sequelize.STRING,
        allowNull: false
      },
      check_out_id: {
        type:Sequelize.STRING,
        allowNull: false
      },
      name: {
        type:Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type:Sequelize.STRING,
        allowNull: false
      },
      amount:{
        type: Sequelize.DOUBLE(18, 2),
        defaultValue: 0.00
      },
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
    await queryInterface.dropTable('donations');
  }
};
