'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.Register,{
        foreignKey: "registerID",
        as: "registers"
      })


      Cart.hasMany(models.CartItem,{
        foreignKey: "cartID",
        as: "cartItems"
      })
    }
  }
  Cart.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    registerID:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Registers', 
        key: 'id',
      },
    },
    isOrdered: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cart',
    timestamps: false
  });
  return Cart;
};