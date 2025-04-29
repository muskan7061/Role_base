const express = require("express")
const { authenticate, authorize } = require("../middlewares/auth.middleware")
const upload = require("../middlewares/multer.middleware")
const validate = require("../middlewares/validate.middleware")
const { productSchema } = require("../validations/product.validation")
const { product, getAllProduct, getOneProduct, updateProduct, deleteProduct, filterProduct } = require("../controllers/product.controller")
const {subCategorySchema} = require("../validations/subCategory.validation")
const router = express.Router()



router.post("/product",  authenticate, authorize(['seller', 'admin']), upload.single("image"), validate(productSchema) ,  product )

router.get("/get-all-porduct",  authenticate, authorize(['admin','user']),  getAllProduct )

router.get("/get-product/:id",  authenticate, authorize(['admin','seller']), validate(subCategorySchema), getOneProduct)

router.put('/update-product/:id',  authenticate, authorize(['admin','seller']), validate(productSchema), updateProduct)

router.delete('/delete-product/:id',   authenticate, authorize(['admin','seller']),validate(productSchema), deleteProduct)

router.get("/filter-all-porduct",  authenticate, authorize(['admin','user']),  filterProduct )

module.exports = router