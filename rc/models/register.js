"use strict";
const { Model } = require("sequelize");
const slugify = require("slugify");
module.exports = (sequelize, DataTypes) => {
  class Register extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Register.belongsTo(models.Role, {
        foreignKey: "roleID",
        as: "roles",
      });
      Register.hasMany(models.Product, {
        foreignKey: "registerID",
        as: "products"
      })
      Register.hasOne(models.cart,{
        foreignKey: "registerID",
        as: "carts"
      })
    }


  }
  Register.init(
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      age: DataTypes.INTEGER,
      countryCode: DataTypes.INTEGER,
      phone: DataTypes.INTEGER,
      image: DataTypes.STRING,
      address: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      slug: DataTypes.STRING,
      password: DataTypes.STRING,
      roleID:{
        type: DataTypes.INTEGER,
        references: {
          model: 'Role', 
          key: 'id',
        },
      }
    },
    {
      sequelize,
      modelName: "Register",
      timestamps: false
    }
  );
  // Hook to auto-generate slug
  Register.beforeCreate((value) => {
    value.slug = slugify(value.name, { lower: true });
  });
  return Register;
};
