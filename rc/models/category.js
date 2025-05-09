"use strict";
const { Model } = require("sequelize");
const slugify = require("slugify");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsTo(models.Product, {
        foreignKey: "productID",
        as: "products",
      });

      Category.hasMany(models.subCategory, {
        foreignKey: "categoryID",
        as: "subCategory"
      })
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      digital: DataTypes.BOOLEAN,
      slug: DataTypes.STRING,
      productID: {
        type: DataTypes.INTEGER,
        references: {
          model: "Products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
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
