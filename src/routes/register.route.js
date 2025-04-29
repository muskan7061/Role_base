const express = require("express")
const { register, getAllUser, login, getOneUser } = require("../controllers/register.controller")
const upload = require("../middlewares/multer.middleware")
const validate = require("../middlewares/validate.middleware")
const { registerSchema } = require("../validations/register.validation")
const { authenticate, authorize } = require("../middlewares/auth.middleware")

const router = express.Router()

router.post("/create-register",  upload.single("image"),  validate(registerSchema), register )

router.get("/get-all-user",   authenticate, authorize(['admin']), getAllUser )

router.post("/login", login )

router.get("/get-one-user/:id",   authenticate, authorize(['admin', 'seller']), getOneUser )



module.exports = router