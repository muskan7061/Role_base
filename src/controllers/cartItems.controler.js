const db = require("../../rc/models");
const cartitems = async (req, res) => {
  try {
    const { cartID, productID, quantity = 1 } = req.body;
    console.log(cartID, productID, quantity);
    // Basic validation
    if (!cartID && !productID) {
      return res.status(400).json({
        status: 400,
        message: "cartID and productID are required",
      });
    }
    const createdCartItems = await db.CartItem.create({
      cartID,
      productID,
      quantity,
    });

    const fullCartItem = await db.CartItem.findOne({
      where: { id: createdCartItems.id },
      include: {
        model: db.Product,
        as: "products", // This must match association alias
        attributes: ["id", "name", "description", "price", "stock", "image"], // add/remove as per your model
      },
    });
    return res.status(200).json({
      status: 200,
      message: "Cart items created succcesfully",
      data: fullCartItem,
    });
  } catch (error) {
    console.log("Error in cartitems Api", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { cartitems };
