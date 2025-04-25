const db = require("../../rc/models");

const product = async (req, res) => {
  try {
    const { name, description, price, status, stock } = req.body;
    console.log(name, description, price, status, stock);

    if (
      [name, description, price, status, stock].some(
        (data) => data.trim() === ""
      )
    ) {
      return res.status(409).json({
        status: 409,
        message: "All fields are require",
      });
    }

    const existProduct = await db.Product.findOne({
      where: { name },
    });
    if (existProduct) {
      return res.status(409).json({
        status: 409,
        message: "Product already exist",
      });
    }
    console.log(existProduct);

    const createProduct = await db.Product.create({
      name,
      description,
      image: req.file.filename,
      price,
      status,
      stock,
    });
    if (!createProduct) {
      return res.status(409).json({
        status: 409,
        message: "something went wrong",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Product have registered succcesfully",
      data: createProduct,
    });
  } catch (error) {
    console.log("Error in product Api", error);
    return res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};

const getAllProduct = async (req, res) =>{
    try {
        const getAll = await db.Product.findAll()
        return res.status(200).json({
            data: getAll
        })
    } catch (error) {
        console.log("Error in getAllProduct Api", error);
        return res.status(500).json({
          status: 500,
          error: error.message,
        });
    }
}

module.exports = { product, getAllProduct };
