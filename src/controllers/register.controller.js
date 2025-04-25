const db = require("../../rc/models");
const {registerSchema} = require("../validations/register.validation")
const { Op } = require("sequelize");
const bcrypt = require("bcrypt")
const jwt  = require("jsonwebtoken")
const register = async (req, res) => {
  try {
    const {name,username,email,age,countryCode,phone,address,state,city,roleID,password} = req.body
     // Validate role input using Joi validation     
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message,
      });
    }
    // check all fields
    if ([name,username,email,age,countryCode,phone,address,state,city,roleID,password].some((data) => data.trim() === "")) {
      return res.status(409).json({
        status: 409,
        message: "All fields are require",
      });
    }
    // check existing
    const existingFind = await db.Register.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });
    if (existingFind) {
      return res.status(409).json({
        status: 409,
        message: "User already exist with Email and username",
      });
    }
    // password encryption
    const hashPassword = await bcrypt.hash(password, 10)
    const createRegister = await db.Register.create({
      name,
      username,
      email,
      age,
      countryCode,
      phone,
      image:req.file.filename,
      address,
      state,
      city,
      password: hashPassword,
      roleID,
    });
    if(!createRegister){
        return res.status(409).json({
            status: 409,
            message: "something went wrong",
          });
    }

    return res.status(200).json({
        status: 200,
        message: "User have registered succcesfully",
        data: createRegister
    })
  } catch (error) {
    console.log("Error in register Api", error);
    return res.status(500).json({
        status: 500,
        error: error.message
    })
  }
};

const login = async (req, res) =>{
    try {
        const {email, username , password} = req.body
        if([email, username, password].some((data) => data.trim() ==="")){
            return res.status(409).json({
                status: 409,
                message: "All fields are require",
              });
        }
        const userFind = await db.Register.findOne({
            where: {
                [Op.or]: [{ username: username }, { email: email }],
              },
        })
        const validPassword = await bcrypt.compare(password, userFind.password)
        if(!validPassword){
            return res.status(409).json({
                status: 409,
                message: "Invalid User credentials",
              });
        }
        if(!userFind){
            return res.status(404).json({
                status: 404,
                message: "User doesnt exist with Email and Username",
              });
        }
        const loggedInUser = await db.Register.findByPk(userFind.id, {
            attributes: { exclude: ['password'] },
          });
        
          const token = jwt.sign(
            {
                id: loggedInUser.id,
                name: loggedInUser.name,
                username: loggedInUser.username,
                email: loggedInUser.email,
                age: loggedInUser.age,
                countryCode: loggedInUser.countryCode,
                phone: loggedInUser.phone,
                state: loggedInUser.state,
                city:loggedInUser.city,
                roleID: loggedInUser.roleID

            }, 
            process.env.JWT_SECRET
            ,
            {
              expiresIn: process.env.JWT_SECRET_EXPIRY,
            }
        )
        console.log("===",token);
    
        res.cookie("token", token, {
            httpOnly: true,
            secure: false
        })
        return res.status(200).json({
            status: 200,
            message: "User login successfully",
            data: loggedInUser,
            token: token
        })
    } catch (error) {
        console.log("Error in login Api", error);
        return res.status(500).json({
            status: 500,
            error: error.message
        })
    }
}

module.exports = { register,login };
