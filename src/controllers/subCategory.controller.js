const db = require("../../rc/models");
const { subCategorySchema } = require("../validations/subCategory.validation");

const subCategory = async (req, res) => {
  try {
    const { name, status, digital, categoryID } = req.body;
    // Validate role input using Joi validation
    const { error } = subCategorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message,
      });
    }
    if (
      [name, status, digital, categoryID].some((data) => data.trim() === "")
    ) {
      return res.status(409).json({
        status: 409,
        message: "All fields are require",
      });
    }
    const createsubCategory = await db.subCategory.create({
      name,
      status,
      digital,
      categoryID,
    });
    if (!createsubCategory) {
      return res.status(409).json({
        status: 409,
        message: "something went wrong",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "sub category have registered succcesfully",
      data: createsubCategory,
    });
  } catch (error) {
    console.log("Error in subCategory Api", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { subCategory };
