const express = require("express")
const {role} = require("../controllers/role.controller")
const validate = require('../middlewares/validate.middleware'); 
const { roleSchema } = require('../validations/role.validation');
const { registerSchema } = require("../validations/register.validation");
const {register, login} = require("../controllers/register.controller");
const {authenticate, authorize} = require("../middlewares/auth.middleware");
const {product, getAllProduct} = require("../controllers/product.controller");
const upload = require("../middlewares/multer.middleware");
const router = express.Router()

router.post("/create-role",validate(roleSchema), role )

router.post("/create-register",  upload.single("image"),  validate(registerSchema), register )

router.post("/login", login )

router.post("/product",  authenticate, authorize(['admin', 'seller']), upload.single("image"),   product )

router.get("/get-all-porduct",  authenticate, authorize(['admin']),  getAllProduct )

module.exports = router