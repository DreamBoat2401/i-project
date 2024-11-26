'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Food.belongsTo(models.User, {
        foreignKey: "userId"
      })
      Food.belongsTo(models.Category, {
        foreignKey: "categoryId"
      })
    }
  }
  Food.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};