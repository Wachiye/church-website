'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Donation.belongsTo(models.User,{
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
    }
  };
  Donation.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    type:{
      type: DataTypes.ENUM("offering","tithing","donation"),
      allowNull: false,
      defaultValue: "offering"
    },
    purpose: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    transaction_id:{
      type: DataTypes.STRING,
      allowNull: false
    },
    amount:{
      type: DataTypes.DOUBLE(18, 2),
      defaultValue: 0.00
    }
  }, {
    sequelize,
    modelName: 'Donation',
  });
  return Donation;
};