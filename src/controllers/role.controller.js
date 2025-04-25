const db = require("../../rc/models");
const { roleSchema } = require("../validations/role.validation");

const role = async (req, res) => {
  try {
    const { role } = req.body;
console.log(role);

    // Validate role input using Joi validation
    const { error } = roleSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message,
      });
    }

    if (!role) {
      return res.status(409).json({
        status: 409,
        message: "Role is require",
      });
    }
    const createRole = await db.Role.create({ role });
    if (!createRole) {
      return res.status(409).json({
        status: 409,
        message: "something went wrong",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Role created succesfully",
      data: createRole,
    });
  } catch (error) {
    console.log("Error in role Api", error);
    return res.status(500).json({
      error: error.message,
      message: "Internal server Error",
    });
  }
};

module.exports = { role };
