'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('events', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      from: {
        type: Sequelize.DATE
      },
      to: {
        type: Sequelize.DATE
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status:{
        allowNull: false,
        type: Sequelize.ENUM("active","pending","finished"),
        defaultValue: 'pending'
      },
      ministry_id :{
        type: Sequelize.UUID,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references:{
          model: "ministries",
          key:"id"
        }
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
    await queryInterface.dropTable('events');
  }
};