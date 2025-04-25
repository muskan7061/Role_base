const { categorySchema } = require("../validations/category.validation");
const db = require("../../rc/models");
const category = async (req, res) => {
  try {
    const { name, status, digital, productID } = req.body;
    // Validate role input using Joi validation
    const { error } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message,
      });
    }
    if ([name, status, digital, productID].some((data) => data.trim() === "")) {
      return res.status(409).json({
        status: 409,
        message: "All fields are require",
      });
    }
    const createCategory = await db.Category.create({
      name,
      status,
      digital,
      productID
    });
    if (!createCategory) {
      return res.status(409).json({
        status: 409,
        message: "something went wrong",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Category have registered succcesfully",
      data: createCategory,
    });
  } catch (error) {
    console.log("Error in category Api", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { category };
