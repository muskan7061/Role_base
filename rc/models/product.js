"use strict";
const { INTEGER } = require("sequelize");
const { Model } = require("sequelize");
const slugify = require("slugify");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Category, {
        foreignKey: "productID",
        as: "categories"
      })
      Product.belongsTo(models.Register,{
        foreignKey: "registerID",
        as: "register"
      })
      Product.belongsTo(models.CartItem,{
        foreignKey: "cartItemID",
        as: "cartitems"
      })
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      slug: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      stock: DataTypes.INTEGER,
      registerID:{
        type: DataTypes.INTEGER,
        references: {
          model: 'Registers', 
          key: 'id',
        },
      }
    },
    {
      sequelize,
      modelName: "Product",
      timestamps: false
    }
  );
  // Hook to auto-generate slug
  Product.beforeCreate((value) => {
    value.slug = slugify(value.name, { lower: true });
  });
  return Product;
};
