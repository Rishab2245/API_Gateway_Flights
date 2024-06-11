'use strict';
const {
  Model
} = require('sequelize');
const {Enums} = require('../utils/common');
const {ADMIN , CUSTOMER , FLIGHT_COMPANY} = Enums.USER_ROLE_ENUMS;
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    this.belongsToMany(models.User, { as: 'User', through: 'User_Role' });
    }
  }
  Role.init({
    name: {
      type:DataTypes.ENUM,
      values:[ADMIN, CUSTOMER, FLIGHT_COMPANY],
      defaultValue:CUSTOMER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};