"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsTo(models.Product,{
        foreignKey: "productID",
        as: "product"
      })
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      digital: DataTypes.BOOLEAN,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  // Hook to auto-generate slug
  Category.beforeCreate((value) => {
    value.slug = slugify(value.name, { lower: true });
  });
  return Category;
};
