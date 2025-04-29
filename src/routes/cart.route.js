const express = require("express")
const {cart} = require("../controllers/cart.controller")

const router = express.Router()


router.post("/create-cart", cart)

module.exports = router