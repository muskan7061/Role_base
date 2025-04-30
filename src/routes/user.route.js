const express = require("express");
const { role } = require("../controllers/role.controller");
const validate = require("../middlewares/validate.middleware");
const { roleSchema } = require("../validations/role.validation");
const router = express.Router();

router.post("/create-role", validate(roleSchema), role);

module.exports = router;
