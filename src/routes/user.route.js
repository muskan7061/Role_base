const express = require("express")
const {role} = require("../controllers/role.controller")
const validate = require('../middlewares/validate.middleware'); 
const { roleSchema } = require('../validations/role.validation');
const { registerSchema } = require("../validations/register.validation");
const {register, login} = require("../controllers/register.controller");
const {authenticate, authorize} = require("../middlewares/auth.middleware");
const {product, getAllProduct} = require("../controllers/product.controller");
const upload = require("../middlewares/multer.middleware");
const { productSchema } = require("../validations/product.validation");
const {category} = require("../controllers/category.controller");
const { categorySchema } = require("../validations/category.validation");
const { subCategory } = require("../controllers/subCategory.controller");
const { subCategorySchema } = require("../validations/subCategory.validation");
const router = express.Router()

router.post("/create-role",validate(roleSchema), role )

router.post("/create-register",  upload.single("image"),  validate(registerSchema), register )

router.post("/login", login )

router.post("/product",  authenticate, authorize(['seller']), upload.single("image"), validate(productSchema) ,  product )

router.get("/get-all-porduct",  authenticate, authorize(['admin']),  getAllProduct )

router.post("/category", validate(categorySchema),  category)

router.post("/sub-category", validate(subCategorySchema), subCategory)



module.exports = router