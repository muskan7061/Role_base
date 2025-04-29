const dotenv = require("dotenv");
const express = require("express");
const sequelize = require("../src/config/db")
const roleRouter = require("./routes/user.route")
const registerRouter = require("./routes/register.route")
const productRouter = require("./routes/product.route")
const categoryRouter = require("./routes/category.route")
dotenv.config("./.env");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/role", roleRouter)

app.use("/api/register", registerRouter)

app.use("/api/product", productRouter)

app.use("/api/category", categoryRouter)

sequelize
  .sync({ force: true })
  .then(() => console.log("Sync"))
  .catch((error) => console.log("Sync FAILED", error));

app.listen(process.env.PORT, () => {
  console.log("App is listing on", process.env.PORT);
});
