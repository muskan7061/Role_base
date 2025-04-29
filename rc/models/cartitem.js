'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartItem.belongsTo(models.Cart,{
        foreignKey: "cartID",
        as: "carts"
      })
      CartItem.hasMany(models.Product,{
        foreignKey: "cartItemID",
        as: "products"

      })

    }
  }
  CartItem.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cartID:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Carts', 
        key: 'id',
      },
    },
    productID:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Products', 
        key: 'id',
      },
    },
    quantity:{
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};