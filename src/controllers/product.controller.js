const db = require("../../rc/models");
const { productSchema } = require("../validations/product.validation");

const product = async (req, res) => {
  try {
    const { name, description, price, status, stock, registerID } = req.body;
    console.log(registerID);
    
      // Validate role input using Joi validation     
      const { error } = productSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: error.details[0].message,
        });
      }
    // console.log(name, description, price, status, stock);
    if (
      [name, description, price, status, stock, registerID].some(
        (data) => data.trim() === ""
      )
    ) {
      return res.status(409).json({
        status: 409,
        message: "All fields are require",
      });
    }

    const existProduct = await db.Product.findOne({
      where: { name },
    });
    if (existProduct) {
      return res.status(409).json({
        status: 409,
        message: "Product already exist",
      });
    }
    // console.log(existProduct);

    const createProduct = await db.Product.create({
      name,
      description,
      image: req.file.filename,
      price,
      status,
      stock,
      registerID
    });
    if (!createProduct) {
      return res.status(409).json({
        status: 409,
        message: "something went wrong",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Product have registered succcesfully",
      data: createProduct,
    });
  } catch (error) {
    console.log("Error in product Api", error);
    return res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};

const getAllProduct = async (req, res) =>{
    try {
        const getAll = await db.Product.findAll({
          include :[ 
            {
            model: db.Category,
            as: "categories",
            include:[
              {
                model: db.subCategory,
                as: "subCategory"
              }
            ]
          },
        ]
        })
        return res.status(200).json({
            data: getAll
        })
    } catch (error) {
        console.log("Error in getAllProduct Api", error);
        return res.status(500).json({
          status: 500,
          error: error.message,
        });
    }
}


const getOneProduct = async (req, res) =>{
  try {
      const {id} = req.params
      const getOne = await db.Product.findOne({where:{id:id}})
      return res.status(200).json({
          data: getOne
      })
  } catch (error) {
      console.log("Error in getOneProduct Api", error);
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
  }
}



module.exports = { product, getAllProduct,getOneProduct };
