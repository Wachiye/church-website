'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Login extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Login.belongsTo(models.User,{
       foreignKey:"user_id",
       onDelete: "CASCADE",
      onUpdate: "CASCADE"
     })
    }
  };
  Login.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Login',
  });
  return Login;
};