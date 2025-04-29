const express = require("express")
const {cart} = require("../controllers/cart.controller")
const { cartitems } = require("../controllers/cartItems.controler")

const router = express.Router()


router.post("/create-cart", cart)

router.post("/create-cart-items", cartitems)

module.exports = router