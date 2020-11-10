'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ministry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Ministry.hasMany(models.User. {
      //   foreignKey: "ministry_id",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE"
      // });
      Ministry.hasMany(models.Event, {
        foreignKey: "ministry_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
    }
  };
  Ministry.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Ministry',
  });
  return Ministry;
};