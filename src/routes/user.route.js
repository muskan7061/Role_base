const express = require("express")
const {role} = require("../controllers/role.controller")
const validate = require('../middlewares/validate.middleware'); 
const { roleSchema } = require('../validations/role.validation');
const {authenticate, authorize} = require("../middlewares/auth.middleware");
const router = express.Router()

router.post("/create-role",authenticate, authorize(['admin', 'user', 'seller']) , validate(roleSchema), role )



module.exports = router