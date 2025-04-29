"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.Register, {
        foreignKey: "registerID",
        as: "Register",
      });
    }
  }
  Cart.init(
    {
      registerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Register",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
