const express = require("express")
const { category} = require("../controllers/category.controller")
const {subCategory } = require("../controllers/subCategory.controller")
const validate = require("../middlewares/validate.middleware")
const { categorySchema } = require("../validations/category.validation")
const { subCategorySchema } = require("../validations/subCategory.validation")
const router = express.Router()


router.post("/category", validate(categorySchema),  category)

router.post("/sub-category", validate(subCategorySchema), subCategory)



module.exports = router