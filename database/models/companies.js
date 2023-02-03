/* eslint-disable indent */
/* eslint-disable no-unused-vars */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Companies.init({
    compId: DataTypes.STRING,
    compName: DataTypes.STRING,
    compSector: DataTypes.STRING,
    CEO: DataTypes.STRING,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Companies',
  });
  return Companies;
};