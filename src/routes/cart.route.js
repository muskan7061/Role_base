const express = require("express")
const {cart} = require("../controllers/cart.controller")
const { cartitems } = require("../controllers/cartItems.controler")
const { authorize, authenticate } = require("../middlewares/auth.middleware")

const router = express.Router()


router.post("/create-cart",  authenticate, authorize(['admin','seller']), cart)

router.post("/create-cart-items", authenticate, authorize(['admin', 'seller']),cartitems)

module.exports = router