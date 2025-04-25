"use strict";
const { Model } = require("sequelize");
const slugify = require("slugify");
module.exports = (sequelize, DataTypes) => {
  class subCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      subCategory.belongsTo(models.Category, {
        foreignKey: "categoryID",
        as: "Category",
      });
    }
  }
  subCategory.init(
    {
      name: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      digital: DataTypes.BOOLEAN,
      slug: DataTypes.STRING,
      categoryID: {
        type: DataTypes.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "subCategory",
    }
  );
    // Hook to auto-generate slug
    subCategory.beforeCreate((value) => {
      value.slug = slugify(value.name, { lower: true });
    });
  return subCategory;
};
