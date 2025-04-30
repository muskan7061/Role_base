const db = require('../models');
const slugify = require('slugify');

module.exports.addCart = async(req,res)=>{
    try{
        // console.log(req.user.role);
        
        const {product_id,quantity,user_id} = req.body;
        if(req.user.role.name !== 'user'){
            return res.status(403).json({ message: "Only users are allowed !!" });
        }
        if(req.user.id !== user_id){
            return res.status(403).json({ message: "Only users can add to cart !!" });
        }
        const product = await db.Product.findByPk(product_id);
        if(!product){
            return res.status(404).json({msg:"Product Not Found !!"});
        }
        const slug = slugify(product.name, { lower: true }); 
        // console.log("Generated Slug:", slug);

        const price = product.price;
        const total = price * quantity;
        const existingCartItem = await db.Cart.findOne({
            where:{
                user_id,
                product_id
            },
            include:{
                model: db.Product,
            }
        })
        if(existingCartItem){
            existingCartItem.quantity += parseInt(quantity);
            existingCartItem.total = existingCartItem.quantity * price;
            await existingCartItem.save();
            return res.json({msg:"Cart Has Been Updated !!",cart:existingCartItem});
        }
        await db.Cart.create({
            user_id,
            product_id,
            quantity,
            price,
            total,
            slug
        })

        var fetchCart = await db.Cart.findOne({include:{
            model:db.Product
        }});
        
        return res.status(201).json({msg:"Cart Has Been Created !!",fetchCart});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"Something went wrong in the add to cart"});
    }
}

module.exports.getCart = async (req,res)=>{
    try{
        let viewCart;
        if(req.user.role.name == 'admin'){
            viewCart = await db.Cart.findAll({include:{
                model:db.Product
            }});
            return res.status(200).json({msg:"Cart Has Been Successfully Fetched !!",viewCart});
        
        }
        else if(req.user.role.name == 'user'){
            viewCart = await db.Cart.findAll({
                where:{
                    user_id:req.user.id
                },
                include:{
                    model:db.Product
                }
            });
            return res.status(200).json({msg:"Cart Has Been Successfully Fetched !!",viewCart});
        }
        else{
            return res.status(403).json({ msg: "Access denied" });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"Something went wrong in the get cart"}); 
    }
}

module.exports.deleteCart = async(req,res)=>{
    try{
        const userId = req.user.id;
        const cart = await db.Cart.findByPk(req.params.id);
        if(!cart){
            return res.status(404).json({msg:"Cart Not Found !!"});
        }
        if(cart.user_id == userId){
            await cart.destroy();
            res.status(200).json({msg:"Cart Has Been Successfully Deleted !!",cart});
        }
        else if(req.user.role.name == 'admin'){
            await cart.destroy();
            res.status(200).json({msg:"Cart Has Been Successfully Deleted !!",cart});
        }
        else{
            return res.status(403).json({ msg: "You are not allowed to deleted this cart !!" });
        }
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"Something went wrong in the delete cart"});
    }
}

module.exports.getSpecificCart = async(req,res)=>{
    try{
        // const requestedId = req.params.id;
        const userId = req.user.id;

        const cartItem = await db.Cart.findByPk(req.params.id,{
            include:{
                model:db.Product
            }
        });
        if(cartItem.user_id == userId){
            if(cartItem){
                return res.status(200).json({msg:"Specific Cart Has Been Successfully Fetched !!",cartItem});
            }
            else{
                return res.status(404).json({msg:"Cart Not Found!!"});
            }
        }
        else if(req.user.role.name === 'admin'){
            if(cartItem){
                return res.status(200).json({msg:"Specific Cart Has Been Successfully Fetched !!",cartItem});
            }
            else{
                return res.status(404).json({msg:"Cart Not Found!!"});
            }
        }
        else{
            return res.status(403).json({ msg: "You are not allowed to view this cart !!" });
        }
        

    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"Something went wrong in the get specific cart"});
    }
}

module.exports.updateCart = async (req, res) => {
    try {
        const cart = await db.Cart.findByPk(req.params.id);

        if (!cart) {
            return res.status(404).json({ msg: "Cart Not Found !!" });
        }

        const userId = req.user.id;
        const userRole = req.user.role?.name;

        
        if (userRole === 'admin' || cart.user_id == userId) {
            const updateData = {
                quantity: req.query.quantity,
                price: req.query.price,
                total: req.query.total
            };

            await cart.update(updateData);
            return res.status(200).json({ msg: "Cart Has Been Successfully Updated !!", cart });
        } else {
            return res.status(403).json({ msg: "You are not allowed to update this cart !!" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Something went wrong in the update cart" });
    }
};
