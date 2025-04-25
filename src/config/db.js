const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("shopping","root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("Connected to Mysql"))
  .catch(() => console.log("Failed  connect to Mysql"));

module.exports = sequelize;
