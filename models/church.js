'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Church extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Church.hasMany(models.User, {
      //   foreignKeY: "church_id",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE"
      // });
    }
  };
  Church.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name:{
      type: DataTypes.STRING,
      allowNull:false
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image : {
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Church',
  });
  return Church;
};