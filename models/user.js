'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User.belongsTo(models.Church,{
      //   foreignKey: "church_id",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE"
      // });
      // User.belongsTo(models.Ministry,{
      //   foreignKey: "ministry_id",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE"
      // });
      User.hasMany(models.Resource, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
      // User.hasMany(models.Sermon, {
      //   foreignKey: "user_id",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE"
      // });
      User.hasMany(models.Donation, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
    }
  };
  User.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
    gender: {
      type: DataTypes.ENUM("male", "female"),
      allowNull: false
    },
    dob:{
      type: DataTypes.DATE,
      allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM("visitor","member","staff"),
      allowNull: false,
      defaultValue: "visitor"
    },
    role: {
      type: DataTypes.ENUM("member","leader"),
      allowNull: false,
      defaultValue: "member"
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};