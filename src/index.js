const dotenv = require("dotenv");
const express = require("express");
const sequelize = require("../src/config/db")
const roleRouter = require("./routes/user.route")
dotenv.config("./.env");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/role", roleRouter)

sequelize
  .sync({ force: true })
  .then(() => console.log("Sync"))
  .catch((error) => console.log("Sync FAILED", error));

app.listen(process.env.PORT, () => {
  console.log("App is listing on", process.env.PORT);
});
