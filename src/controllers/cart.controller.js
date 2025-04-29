 const db = require("../../rc/models")
const cart = async (req, res) => {
  try {
    const { registerID } = req.body;
    const createdCart = await db.Cart.create({registerID})
    return res.status(200).json({
      status: 200,
      message: "Cart created succcesfully",
      data: createdCart,
    });
  } catch (error) {
    console.log("Error in cart Api", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { cart };
