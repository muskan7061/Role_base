const express = require("express")
const { addToCart } = require("../controllers/addToCart.controller")
const router = express.Router()

router.post("/create-cart", addToCart)

module.exports = router