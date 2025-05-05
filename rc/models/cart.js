"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cart.belongsTo(models.Register, {
        foreignKey: "regsiterID",
        as: "registers",
      });
    }
  }
  cart.init(
    {
      registerID: {
        type: DataTypes.INTEGER,
        references: {
          model: "Register",
          key: "id",
        },
      },
      totalItems: DataTypes.INTEGER,
      status: DataTypes.STRING,
      subTotal: DataTypes.INTEGER,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "cart",
    }
  );
  // Hook to auto-generate slug
  cart.beforeCreate((value) => {
    value.slug = slugify(value.status, { lower: true });
  });
  return cart;
};
